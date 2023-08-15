from flask import Flask, render_template, request, jsonify, json
import GPT4_API_optimized as GPT4_API
import logging

app = Flask(__name__, static_folder="client/build", static_url_path="/")

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        data = json.loads(request.data)
        essay = data['essay']
        response = GPT4_API.evaluate_essay(essay)
        return jsonify(response)
    except Exception as e:
        logging.exception("Error while evaluating the essay")
        return jsonify({"error": str(e)}), 500
    
@app.route('/test_gpt4', methods=['GET'])
def test_gpt4():
    try:
        response = GPT4_API.evaluate_essay("Test essay content")
        return jsonify(response)
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
