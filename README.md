# Cardiovascular Disease Prediction

## Project Overview
This project focuses on developing an advanced Machine Learning model to predict cardiovascular disease based on various health parameters. The goal is to provide an accurate and interpretable prediction system that can assist in early diagnosis and intervention.

## Key Features
- **Data Preprocessing**: Comprehensive cleaning and processing of raw medical datasets to ensure data quality and consistency.
- **Feature Engineering**: Creation of new, insightful features such as Body Mass Index (BMI) and Blood Pressure (BP) categories to enhance model predictive power.
- **Handling Class Imbalance**: Employed `scale_pos_weight` within the XGBoost model to effectively address class imbalance, ensuring fair and accurate predictions for both positive and negative classes.
- **Model Selection & Hyperparameter Tuning**: Utilized XGBoost, a powerful gradient boosting framework, with extensive hyperparameter tuning performed via `RandomizedSearchCV` to optimize model performance.
- **Robust Evaluation Metrics**: The model's performance is rigorously evaluated using a suite of metrics:
    - **Confusion Matrix**: To understand the types of errors made by the model.
    - **Receiver Operating Characteristic (ROC) AUC**: A key metric for evaluating binary classification models, indicating the model's ability to distinguish between classes.
    - **Precision-Recall (PR) Curve**: Particularly useful for imbalanced datasets, providing insight into the trade-off between precision and recall.
    - **SHAP (SHapley Additive exPlanations) Values**: For model interpretability, providing insights into the contribution of each feature to individual predictions.
- **Deployment Readiness**: The final trained model and the data scaler are saved as `.pkl` files, facilitating easy integration into deployment pipelines.

## Technologies Used
- **Python**: The primary programming language for development.
- **Pandas & NumPy**: Essential libraries for data manipulation and numerical operations.
- **Scikit-learn**: A comprehensive library for machine learning, used for data preprocessing, model selection, and evaluation.
- **XGBoost**: The chosen gradient boosting library for building the predictive model.
- **SHAP**: For advanced model interpretability and feature importance analysis.
- **Matplotlib & Seaborn**: Libraries for data visualization and plotting model performance.

## Model Performance Highlights
The developed model demonstrates strong predictive capabilities:
- **ROC AUC Score**: Consistently achieves a score of approximately **0.90+**, indicating excellent discrimination ability.
- **Accuracy**: The model is tuned to achieve an optimal balance between precision and recall, with overall accuracy reflecting this balance, particularly emphasized through F1-score and AUC metrics.

This project aims to provide a reliable and transparent tool for cardiovascular disease prediction, leveraging state-of-the-art machine learning techniques.
