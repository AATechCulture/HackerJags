document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('airportBtn').addEventListener('click', getAirportDetails);
    document.getElementById('flightsBtn').addEventListener('click', getFlights);
});

const baseURL = 'http://localhost:4000';

function getAirportDetails() {
    const iataCode = document.getElementById('iataCode').value.trim();
    if (!iataCode) {
        displayError('Please enter an IATA Code.');
        return;
    }

    console.log('Requesting airport details for:', iataCode);

    fetch(`${baseURL}/airports?code=${iataCode}`)
        .then(handleResponse)
        .then(data => {
            console.log('Airport data received:', data);
            displayResults(JSON.stringify(data, null, 2));
        })
        .catch(displayError);
}
// ... (the rest of your existing script)
function getFlights() {
    const date = document.getElementById('flightDate').value;
    const origin = document.getElementById('originCode').value.trim();
    const destination = document.getElementById('destinationCode').value.trim();

    if (!date || !origin || !destination) {
        displayError('Please enter all the details: date, origin IATA code, and destination IATA code.');
        return;
    }

    const url = `${baseURL}/flights?date=${encodeURIComponent(date)}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayFlights(data);
        })
        .catch(error => {
            displayError(`Failed to load data: ${error}`);
        });
}


function displayFlights(flights) {
    const results = document.getElementById('results');
    // Clear previous results
    results.innerHTML = '';
    
    // Create a table element
    let table = '<table border="1"><tr><th>Flight Number</th><th>Origin</th><th>Destination</th><th>Departure</th><th>Arrival</th><th>Duration</th><th>Aircraft Model</th></tr>';

    // Loop over each flight and add a row to the table for each
    flights.forEach(flight => {
        table += `<tr>
                    <td>${flight.flightNumber}</td>
                    <td>${flight.origin.city} (${flight.origin.code})</td>
                    <td>${flight.destination.city} (${flight.destination.code})</td>
                    <td>${new Date(flight.departureTime).toLocaleString()}</td>
                    <td>${new Date(flight.arrivalTime).toLocaleString()}</td>
                    <td>${flight.duration.locale}</td>
                    <td>${flight.aircraft.model}</td>
                  </tr>`;
    });

    // Close the table HTML string
    table += '</table>';

    // Set the inner HTML of the results element to the table
    results.innerHTML = table;
}

function displayError(message) {
    document.getElementById('results').innerHTML = `<div class="error">${message}</div>`;
}

// Function to handle the response from the fetch call
function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}
