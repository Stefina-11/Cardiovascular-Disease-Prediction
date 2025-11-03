from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

try:
    model = joblib.load('xgb_cardio_model.pkl')
    scaler = joblib.load('scaler.pkl')
    print("Model and Scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model or scaler: {e}")
    model = None
    scaler = None

FEATURE_COLUMNS = [
    'age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'smoke', 'alco', 'active',
    'bmi', 'pulse_pressure', 'mean_arterial_pressure', 'cholesterol_2', 'cholesterol_3',
    'gluc_2', 'gluc_3', 'bp_status_High', 'bp_status_Normal'
]

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or scaler is None:
        return jsonify({'error': 'Model or scaler not loaded'}), 500

    try:
        data = request.get_json(force=True)
        print(f"Received data: {data}")
        
        input_df = pd.DataFrame([data])
        print(f"Initial DataFrame: {input_df}")

        required_fields = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active']
        missing = [f for f in required_fields if f not in input_df.columns]
        if missing:
            msg = f"Missing required fields: {missing}"
            print(msg)
            return jsonify({'error': msg}), 400
        for col in ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active']:
            try:
                input_df[col] = pd.to_numeric(input_df[col], errors='raise')
            except Exception as e:
                msg = f"Invalid value for {col}: {input_df[col].tolist()}"
                print(msg)
                return jsonify({'error': msg}), 400
        age_val = float(input_df.at[0, 'age'])
        if age_val > 200:
            input_df['age'] = input_df['age'] / 365.25
            print(f"Interpreted age as days and converted to years: {input_df.at[0,'age']}")
        else:
           
            input_df['age'] = input_df['age']
            print(f"Interpreted age as years: {input_df.at[0,'age']}")

        input_df['bmi'] = input_df['weight'] / (input_df['height'] / 100) ** 2
        input_df['bp_status'] = np.where((input_df['ap_hi'] >= 140) | (input_df['ap_lo'] >= 90), 'High',
                                 np.where((input_df['ap_hi'] < 120) & (input_df['ap_lo'] < 80), 'Normal', 'Elevated'))
        input_df['mean_arterial_pressure'] = (2 * input_df['ap_lo'] + input_df['ap_hi']) / 3
        input_df['pulse_pressure'] = input_df['ap_hi'] - input_df['ap_lo']
        
        print(f"DataFrame after feature engineering: {input_df}")
        input_df['cholesterol_2'] = (input_df['cholesterol'] == 2).astype(int)
        input_df['cholesterol_3'] = (input_df['cholesterol'] == 3).astype(int)
        input_df['gluc_2'] = (input_df['gluc'] == 2).astype(int)
        input_df['gluc_3'] = (input_df['gluc'] == 3).astype(int)
        input_df['bp_status_High'] = (input_df['bp_status'] == 'High').astype(int)
        input_df['bp_status_Normal'] = (input_df['bp_status'] == 'Normal').astype(int)
        
        print(f"DataFrame after feature engineering and dummy creation: {input_df}")

        for col in FEATURE_COLUMNS:
            if col not in input_df.columns:
                input_df[col] = 0
        
       
        print(f"DataFrame columns before final selection: {input_df.columns.tolist()}")
        input_data = input_df[FEATURE_COLUMNS].astype(float)
        print(f"Input data before scaling: {input_data}")
        scaled_data = scaler.transform(input_data)
        prediction = model.predict(scaled_data)[0]

        probability = None
        try:
            if hasattr(model, 'predict_proba'):
                probability = float(model.predict_proba(scaled_data)[:, 1][0])
        except Exception as e:
            print(f"Warning: could not compute probability: {e}")

        result = {'prediction': int(prediction)}
        if probability is not None:
            result['probability'] = probability

        return jsonify(result)

    except Exception as e:
        import traceback
        print(f"Error during prediction: {e}")
        traceback.print_exc() 
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
