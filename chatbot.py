import openai
import requests
from flask import Flask, request, jsonify, render_template,send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
  
openai.api_key = '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'


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    response_message = get_gpt_response(user_message)
    return jsonify({'response': response_message})

@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/index1')
def index1():
    return send_from_directory('html', 'index1.html')


def get_gpt_response(message):
    # Get a response from the OpenAI API using GPT-4.
    gpt_response = openai.Completion.create(
        engine="text-davinci-003",  # Change to GPT-4 engine identifier
        prompt=message,
        max_tokens=150
    )
    # Extract the text response from GPT-4's output.
    return gpt_response.choices[0].text.strip()


def get_flights(date, origin, destination):
    # Call the flight information API with the extracted parameters.
    response = requests.get(f'http://localhost:4000/flights?date={date}&origin={origin}&destination={destination}')
    # Check if the API call was successful.
    if response.status_code == 200:
        # Parse the flight data from the API response.
        flights_data = response.json()
        # Format the flight data into a user-friendly message.
        return format_flight_info(flights_data)
    else:
        # Handle errors.
        return "Sorry, I couldn't retrieve flight data at this time."

def handle_user_message(message):
    # First, we use GPT to understand the user's message.
    gpt_response = get_gpt_response(message)

    # Then, extract the necessary information for the API call.
    # For simplicity, let's assume GPT-3 returns a JSON-like string with the needed parameters.
    # In a real scenario, you'd parse the GPT-3 response more carefully.
    parameters = extract_parameters(gpt_response)

    # If the parameters are successfully extracted, call the API.
    if parameters:
        return get_flights(parameters['date'], parameters['origin'], parameters['destination'])
    else:
        # If parameters could not be extracted, inform the user.
        return "I'm not sure I understood that. Could you provide the date, origin, and destination airports?"

if __name__ == '__main__':
    app.run(debug=True, port=5001)

