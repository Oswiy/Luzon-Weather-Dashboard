console.log("script.js started");

async function fetchWeather() {
  try {
    const lat = 16.2904;
    const lon = 120.6312;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("An error occurred", error.message);
    return null;
  }
}

fetchWeather();
