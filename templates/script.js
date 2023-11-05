document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('flightsBtn').addEventListener('click', getFlights);
});

const baseURL = 'http://localhost:4000';
document.addEventListener('DOMContentLoaded', function() {
    const airports = [
        // ... your airports array
    ];

    const sourceSelect = document.getElementById('source');
    const destinationSelect = document.getElementById('destination');
    
    // Fill the select elements with airport options
    airports.forEach(airport => {
        const sourceOption = document.createElement('option');
        sourceOption.value = airport.code;
        sourceOption.textContent = `${airport.city} (${airport.code})`;
        sourceSelect.appendChild(sourceOption);

        const destOption = document.createElement('option');
        destOption.value = airport.code;
        destOption.textContent = `${airport.city} (${airport.code})`;
        destinationSelect.appendChild(destOption);
    });

    document.getElementById('flightForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const date = document.getElementById('date').value;
        const source = sourceSelect.value;
        const destination = destinationSelect.value;

        fetch(`http://localhost:4000/?date=${date}&source=${source}&destination=${destination}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

function getFlights() {
    const date = document.getElementById('flightDate').value;
    const origin = document.getElementById('originCode').value.trim(); // Get origin from input
    const destination = document.getElementById('destinationCode').value.trim(); // Get destination from input

    if (!date) {
        displayError('Please enter a date.');
        return;
    }
    if (!origin) {
        displayError('Please enter an origin IATA code.');
        return;
    }
    if (!destination) {
        displayError('Please enter a destination IATA code.');
        return;
    }

    const url = `${baseURL}/flights?date=${encodeURIComponent(date)}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
    window.location.href = url;
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    // Clear previous results
    resultsDiv.innerHTML = '';

    // Format and display the new results
    // The actual display will depend on the structure of the data returned by the API
    // Here is an example of what it might look like:
    data.flights.forEach(flight => {
        const flightDiv = document.createElement('div');
        flightDiv.className = 'flight';
        flightDiv.innerHTML = `
            <p>Flight number: ${flight.number}</p>
            <p>Departure: ${flight.departureTime} - Arrival: ${flight.arrivalTime}</p>
            <p>Price: $${flight.price}</p>
        `;
        resultsDiv.appendChild(flightDiv);
    });
}
