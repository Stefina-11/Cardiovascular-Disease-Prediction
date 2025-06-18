# Cardiovascular-Disease-Prediction
Built an advanced ML model to predict cardiovascular disease using health data. Applied feature engineering (BMI, BP categories), handled class imbalance, and used XGBoost with hyperparameter tuning. Evaluated with ROC AUC, PR curve, SHAP explainability, and saved the model for deployment.

📌 Features
Cleaned and processed medical dataset

Feature engineering (BMI, BP categories)

Class imbalance handled using scale_pos_weight

Hyperparameter tuning via RandomizedSearchCV

Evaluation using:

Confusion matrix

ROC AUC

Precision-Recall curve

Feature importance with SHAP values

Final model and scaler saved as .pkl files

🧠 Technologies Used
Python

Pandas, NumPy

Scikit-learn

XGBoost

SHAP

Matplotlib & Seaborn

📈 Model Performance
ROC AUC Score: ~0.90+

Accuracy: Tuned towards optimal balance using F1-score and AUC
