import joblib

try:
    feature_columns = joblib.load('feature_columns.pkl')
    print(feature_columns)
except Exception as e:
    print(f"Error loading feature_columns.pkl: {e}")
