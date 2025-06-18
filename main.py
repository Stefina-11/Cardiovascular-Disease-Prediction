import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import zipfile
from sklearn.model_selection import train_test_split, StratifiedKFold, RandomizedSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    classification_report, confusion_matrix,
    roc_auc_score, ConfusionMatrixDisplay,
    roc_curve, precision_recall_curve, f1_score
)
from xgboost import XGBClassifier, plot_importance
import joblib
import shap
import warnings
warnings.filterwarnings("ignore")

def load_and_preprocess():
    zip_path = 'dataset/cardio_train.zip'
    with zipfile.ZipFile(zip_path) as z:
        with z.open('cardio_train.csv') as f:
            df = pd.read_csv(f, sep=';')
    df['age'] = df['age'] / 365.25
    df['bmi'] = df['weight'] / (df['height'] / 100) ** 2
    df = df[(df['ap_hi'] >= 80) & (df['ap_hi'] <= 250)]
    df = df[(df['ap_lo'] >= 50) & (df['ap_lo'] <= 150)]
    df['bp_status'] = np.where((df['ap_hi'] >= 140) | (df['ap_lo'] >= 90), 'High',
                         np.where((df['ap_hi'] < 120) & (df['ap_lo'] < 80), 'Normal', 'Elevated'))

    df = pd.get_dummies(df, columns=['cholesterol', 'gluc', 'bp_status'], drop_first=True)
    df.drop(columns=['id'], inplace=True)
    
    print("Class Distribution:\n", df['cardio'].value_counts(normalize=True))

    return df

def scale_features(X_train, X_test):
    scaler = StandardScaler()
    return scaler.fit_transform(X_train), scaler.transform(X_test), scaler

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]
    
    print("\nClassification Report:\n", classification_report(y_test, y_pred))
    print("ROC AUC Score:", roc_auc_score(y_test, y_proba))
    ConfusionMatrixDisplay.from_predictions(y_test, y_pred)
    plt.title("Confusion Matrix")
    plt.show()

    
    fpr, tpr, _ = roc_curve(y_test, y_proba)
    plt.plot(fpr, tpr, label="ROC Curve (AUC = {:.2f})".format(roc_auc_score(y_test, y_proba)))
    plt.plot([0, 1], [0, 1], 'k--')
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curve")
    plt.legend()
    plt.grid()
    plt.show()
    
    precision, recall, _ = precision_recall_curve(y_test, y_proba)
    plt.plot(recall, precision, label="PR Curve")
    plt.xlabel("Recall")
    plt.ylabel("Precision")
    plt.title("Precision-Recall Curve")
    plt.grid()
    plt.show()

def feature_importance_plot(model, X):
    plt.figure(figsize=(12, 6))
    plot_importance(model, max_num_features=10, importance_type='gain', show_values=False)
    plt.title("Top 10 Feature Importances")
    plt.tight_layout()
    plt.show()

def tune_and_train(X_train, y_train, ratio):
    params = {
        'n_estimators': [100, 200],
        'max_depth': [3, 4, 5, 6],
        'learning_rate': [0.01, 0.05, 0.1],
        'subsample': [0.8, 1],
        'colsample_bytree': [0.8, 1],
        'scale_pos_weight': [ratio],
        'random_state': [42],
        'use_label_encoder': [False],
        'eval_metric': ['logloss']
    }

    model = XGBClassifier()
    clf = RandomizedSearchCV(model, param_distributions=params, cv=3, n_iter=10, scoring='roc_auc', n_jobs=-1)
    clf.fit(X_train, y_train)
    print("Best Parameters Found:", clf.best_params_)
    return clf.best_estimator_

def main():
    df = load_and_preprocess()
    X = df.drop('cardio', axis=1)
    y = df['cardio']
    X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)
    X_train_scaled, X_test_scaled, scaler = scale_features(X_train, X_test)
    ratio = y_train.value_counts()[0] / y_train.value_counts()[1]
    model = tune_and_train(X_train_scaled, y_train, ratio)
    evaluate_model(model, X_test_scaled, y_test)
    feature_importance_plot(model, X)
   
    joblib.dump(model, 'xgb_cardio_model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    print("Model and Scaler saved successfully.")
    
    explainer = shap.Explainer(model, X_train_scaled)
    shap_values = explainer(X_test_scaled[:100])
    shap.plots.beeswarm(shap_values)
    plt.title("SHAP Value Distribution")
    plt.show()

if __name__ == "__main__":
    main()
