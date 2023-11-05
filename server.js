const express = require('express');
const axios = require('axios');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const FLIGHT_ENGINE_BASE_URL = 'http://localhost:8000'; // Replace with the actual Flight Engine API base URL if different

// Route to get details of a given airport by its IATA code
app.get('/api/airports', async (req, res) => {
  try {
    const { code } = req.query;
    const response = await axios.get(`${FLIGHT_ENGINE_BASE_URL}/airports?code=${code}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching airport details:', error);
    res.status(500).send('Error fetching airport details');
  }
});

// Route to get flights for a given date
app.get('/api/flights', async (req, res) => {
  try {
    const { date, destination } = req.query;
    let url = `${FLIGHT_ENGINE_BASE_URL}/flights?date=${date}`;
    if (destination) {
      url += `&destination=${destination}`;
    }
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).send('Error fetching flights');
  }
});

// ... other server setup code, like socket.io handling ...

http.listen(3000, () => {
  console.log('listening on *:3000');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Set up socket.io communication
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  // More socket.io events
});


