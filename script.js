function getWeather() {
    const location = document.getElementById('locationInput').value;
  
    if (!location) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherData(lat, lon);
      }, () => {
        document.getElementById('weatherDisplay').innerHTML = '<p>Location access denied.</p>';
      });
    } else {
      // Use OpenStreetMap Nominatim to get lat/lon
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(res => res.json())
        .then(data => {
          if (data.length > 0) {
            const lat = data[0].lat;
            const lon = data[0].lon;
            fetchWeatherData(lat, lon);
          } else {
            document.getElementById('weatherDisplay').innerHTML = '<p>Location not found.</p>';
          }
        });
    }
  }
  
  function fetchWeatherData(lat, lon) {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        const weather = data.current_weather;
        const weatherInfo = `
          <h2>Location: (${lat}, ${lon})</h2>
          <p>🌡️ Temperature: ${weather.temperature}°C</p>
          <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
          <p>🧭 Wind Direction: ${weather.winddirection}°</p>
        `;
        document.getElementById('weatherDisplay').innerHTML = weatherInfo;
      })
      .catch(() => {
        document.getElementById('weatherDisplay').innerHTML = '<p>Failed to fetch weather data.</p>';
      });
  }
  