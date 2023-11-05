document.getElementById('chatbot-icon').addEventListener('click', function() {
    document.getElementById('chatbot-popup').style.display = 'flex';
  });
  // Check if the user is asking for airport details
if (userMessage.includes('airport details for')) {
  const code = userMessage.split(' ')[3]; // Assuming the message format is "airport details for CODE"
  fetch(`/api/airports?code=${code}`)
    .then(response => response.json())
    .then(data => {
      // Do something with the data, e.g., display it in the chat
      addChatMessage(`Airport details: ${JSON.stringify(data)}`, false);
    })
    .catch(error => {
      console.error('Error:', error);
      addChatMessage('Sorry, could not fetch airport details.', false);
    });
}

// Check if the user is asking for flight details
if (userMessage.includes('flights for')) {
  const parts = userMessage.split(' ');
  const date = parts[3]; // Assuming the message format is "flights for YYYY-MM-DD"
  const destination = parts[5]; // Assuming the message format is "flights for YYYY-MM-DD to CODE"
  fetch(`/api/flights?date=${date}&destination=${destination}`)
    .then(response => response.json())
    .then(data => {
      // Do something with the data, e.g., display it in the chat
      addChatMessage(`Flights details: ${JSON.stringify(data)}`, false);
    })
    .catch(error => {
      console.error('Error:', error);
      addChatMessage('Sorry, could not fetch flight details.', false);
    });
}