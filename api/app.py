from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/api/predict', methods=['POST'])

def predict():
    data = request.json
    features = np.array(list(data.values())).reshape(1, -1)
    prediction = model.predict_proba(features)[0][1]
    return jsonify({'risk': float(prediction)})

if __name__ == '__main__':
    app.run(debug=True)