document.getElementById('space-station-select').addEventListener('change', function() {
    // Enable the "Next" button when an option is selected
    document.getElementById('next-button').disabled = !this.value;
});

document.getElementById('next-button').addEventListener('click', function() {
    // Show the header when the "Next" button is clicked
    document.querySelector('header').classList.remove('hidden');
});

// Add this JavaScript to script.js

function getWeather(station) {
    fetch('http://127.0.0.1:5000', {  // Update this URL with your Flask server URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ station: station }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('station-details').innerHTML = `
            <div class="weather-box">
                <h2>${data.location} Weather</h2>
                <p>Temperature: ${data.temperature}°C</p>
                <p>Feels Like: ${data.feels_like}°C</p>
                <p>Wind Speed: ${data.wind_speed} km/h</p>
                <p>Wind Direction: ${data.wind_direction}</p>
                <p>Humidity: ${data.humidity}%</p>
                <p>Cloud Coverage: ${data.cloud_coverage}%</p>
                <p>UV Index: ${data.uv_index}</p>
                <p>Description: ${data.description}</p>
            </div>
        `;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.querySelector('.dropdown').addEventListener('change', function() {
    const station = this.value;
    getWeather(station);
});

document.querySelector('.button').addEventListener('click', function() {
    // Redirect the current page to the ISS Tracker website
    window.location.href = 'https://isstracker.spaceflight.esa.int/index_portal.php';
});
