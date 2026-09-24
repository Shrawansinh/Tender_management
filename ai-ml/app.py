from flask import Flask, request, jsonify
from sklearn.ensemble import IsolationForest
import numpy as np

app = Flask(__name__)

# # Dummy training data
# data = np.array([
#     [10000],
#     [12000],
#     [11000],
#     [9000],
#     [9500]
# ])

# model = IsolationForest(contamination=0.1)

# model.fit(data)

@app.route('/predict-fraud', methods=['POST'])
def predict_fraud():
    data = request.get_json()

    tenderPrice = float(data['tenderPrice'])
    bidAmount = float(data['bidAmount'])
    minBidAmount = tenderPrice * 0.90 # aanathi moti fraud
    # prediction = model.predict([[bidAmount]])
    if bidAmount > minBidAmount:
        result = "Safe"
    else:
        result = "Fraud"
    return jsonify({
        "result": result,
        "tenderPrice":tenderPrice,
        "bidAmount":bidAmount,
        "minBidAmount":minBidAmount
        
    })

if __name__ == '__main__':
    app.run(port=5001)