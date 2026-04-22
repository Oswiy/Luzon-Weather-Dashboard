const elements = {
  dayDisplay: document.getElementById("dayDisplay"),
  timeDisplay: document.getElementById("timeDisplay"),
  location: document.getElementById("location"),
  difficultyValue: document.getElementById("difficultyValue"),
  hikabilityDescription: document.getElementById("hikabilityDescription"),
  mountain: document.getElementById("mountain"),
  humidityValue: document.getElementById("humidityValue"),
  humidityResult: document.getElementById("humidityResult"),
  humidityDescription: document.getElementById("humidityDescription"),
  temperature: document.getElementById("temperature"),
  feelsLike: document.getElementById("feelsLike"),
  windValue: document.getElementById("windValue"),
  windDirection: document.getElementById("windDirection"),
  windGust: document.getElementById("windGust"),
  windDescription: document.getElementById("windDescription"),
  elevationValue: document.getElementById("elevationValue"),
  cloudinessValue: document.getElementById("cloudinessValue"),
  sunriseValue: document.getElementById("sunriseValue"),
  sunsetValue: document.getElementById("sunsetValue"),
  mountainSelect: document.getElementById("mountainSelect"),
  weatherIcon: document.getElementById("weatherIcon"),
};

const now = new Date();
const todayString = now.toLocaleDateString([], {
  month: "long",
  day: "2-digit",
  year: "numeric",
});
const currentTimeString = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

elements.dayDisplay.textContent = todayString;
elements.timeDisplay.textContent = currentTimeString;

function humidityAdvice(humidity) {
  switch (humidity) {
    case "Very Dry":
      return "Extremely dry air. High fire risk on open slopes. Drink water frequently.You're losing moisture faster than you realize. Lip balm and moisturizer strongly recommended.";
    case "Dry":
      return "Crisp and pleasant. Ideal hiking weather! Sweat evaporates quickly keeping you cool. Still remember to hydrate regularly, dry air masks dehydration.";
    case "Normal":
      return "Typical forest humidity. Comfortable for most hikers. Trail conditions should be normal. Light mist possible near summits.";
    case "Humid":
      return "Sticky and damp. Sweat won't evaporate well, you'll feel warmer than actual temperature. Trails may be slippery. Wear moisture wicking clothing.";
    case "Very Humid":
      return "Heavy air, likely foggy. Expect limited visibility and possible sea of clouds. Jacket and gear will stay wet. Protect electronics from moisture.";
    default:
      return "Dense fog and drizzle. Visibility severely reduced. Stay on marked trails. Risk of hypothermia even in moderate temperatures. Waterproof layers essential.";
  }
}

function getHumidity(humidityScore) {
  switch (true) {
    case humidityScore < 30:
      return "Very Dry";
    case humidityScore >= 30 && humidityScore < 49:
      return "Dry";
    case humidityScore >= 50 && humidityScore < 70:
      return "Normal";
    case humidityScore >= 70 && humidityScore < 85:
      return "Humid";
    case humidityScore >= 85 && humidityScore < 95:
      return "Very Humid";
    default:
      return "Foggy";
  }
}

const getWindDirection = (degrees) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index % 16];
};

const formatGust = (gust) => {
  if (gust === undefined || gust === null) return "None";
  return `${gust.toFixed(1)} km/h`;
};

function getWindDescription(speedMps) {
  if (speedMps < 0.3) return "Calm";
  if (speedMps < 1.6) return "Very Light";
  if (speedMps < 3.4) return "Light";
  if (speedMps < 5.5) return "Gentle";
  if (speedMps < 8.0) return "Moderate";
  if (speedMps < 10.8) return "Fresh";
  if (speedMps < 13.9) return "Strong";
  if (speedMps < 17.2) return "Very Strong";
  if (speedMps < 20.8) return "Gale";
  return "Storm";
}

// Example: console.log(getWindDescription(1.96)); // Output: "Light"

async function fetchWeather(mountain) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${mountain.lat}&lon=${mountain.lon}&units=metric&appid=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    console.log(data.weather.icon);
    displayWeather(data, mountain);
  } catch (error) {
    console.log("An error occurred", error.message);
    return null;
  }
}

function capitalizeFirstChar(str) {
  return str
    .split(" ")
    .map((char) => {
      if (char.length === 0) return char;
      return char[0].toUpperCase() + char.slice(1).toLowerCase();
    })
    .join(" ");
}

function displayWeather(data, mountain) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const mountainDifficulty = mountain.difficulty;
  const humidityScore = data.main.humidity;
  const humidityCondition = getHumidity(data.main.humidity);
  const dataWindDegree = data.wind.deg;
  const dataWindGust = formatGust(data.wind.gust);
  const windSpeed = data.wind.speed;
  const windDescription = getWindDescription(windSpeed);
  const mountainSunrise = new Date(data.sys.sunrise * 1000);
  const sunriseTimeString = mountainSunrise.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const mountainSunset = new Date(data.sys.sunset * 1000);
  const sunsetTimeString = mountainSunset.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // Location
  elements.location.textContent = `${mountain.location}`;
  // difficulty
  elements.difficultyValue.textContent = `${mountain.difficulty}/9`;
  elements.hikabilityDescription.textContent = `${mountain.difficultyText}`;
  // Mountain
  elements.mountain.textContent = `${mountain.name}`;
  // Icon
  elements.weatherIcon.src = iconUrl;
    // Humidity
    elements.humidityValue.textContent = `${humidityScore}%`;
  elements.humidityResult.textContent = getHumidity(humidityScore);
  elements.humidityDescription.textContent = humidityAdvice(humidityCondition);
  // Data Cards
  // Temp
  elements.temperature.textContent = `${data.main.temp}`;
  elements.feelsLike.textContent = `${data.main.feels_like}`;
  // Wind
  elements.windValue.textContent = `${windSpeed} km/hr`;
  elements.windDirection.textContent = getWindDirection(dataWindDegree);
  elements.windGust.textContent = `${dataWindGust}`;
  elements.windDescription.textContent = `Wind Description: ${windDescription}`;
  // Elevation
  elements.elevationValue.innerHTML = `${mountain.elevation}m`;
  // Cloudiness
  elements.cloudinessValue.textContent = capitalizeFirstChar(
    data.weather[0].description,
  );
  // Sunrise
  elements.sunriseValue.textContent = sunriseTimeString;
  // Sunset
  elements.sunsetValue.textContent = sunsetTimeString;
}

const mountains = [
  {
    id: "pulag",
    name: "Mt. Pulag",
    lat: 16.5975,
    lon: 120.8992,
    elevation: "2,922",
    location: "Benguet, Kabayan",
    difficulty: 3, // Varies by trail
    difficultyText: "Mild",
  },
  {
    id: "ugo",
    name: "Mt. Ugo",
    lat: 16.3192,
    lon: 120.802,
    elevation: "2,150",
    location: "Benguet, Itogon",
    difficulty: 5,
    difficultyText: "Moderate",
  },
  {
    id: "maculot",
    name: "Mt. Maculot",
    lat: 13.9212,
    lon: 121.0519,
    elevation: "930",
    location: "Batangas, Cuenca",
    difficulty: 3, // Varies by route
    difficultyText: "Mild",
  },
  {
    id: "tapulao",
    name: "Mt. Tapulao",
    lat: 15.481,
    lon: 120.1213,
    elevation: "2,034",
    location: "Zambales, Palauig",
    difficulty: 5,
    difficultyText: "Moderate",
  },
  {
    id: "arayat",
    name: "Mt. Arayat",
    lat: 15.20129,
    lon: 120.74312,
    elevation: "1,026",
    location: "Pampanga, Arayat",
    difficulty: 5, // Varies by route
    difficultyText: "Moderate",
  },
  {
    id: "batulao",
    name: "Mt. Batulao",
    lat: 14.0403,
    lon: 120.802,
    elevation: "693",
    location: "Batangas, Nasugbu",
    difficulty: 4,
    difficultyText: "Average",
  },
  {
    id: "daraitan",
    name: "Mt. Daraitan",
    lat: 14.6131,
    lon: 121.4388,
    elevation: "719",
    location: "Rizal, Tanay",
    difficulty: 4,
    difficultyText: "Average",
  },
  {
    id: "pinatubo",
    name: "Mt. Pinatubo",
    lat: 15.14167,
    lon: 120.35,
    elevation: "1,486",
    location: "Tarlac, Capas",
    difficulty: 2,
    difficultyText: "Easy",
  },
  {
    id: "marami",
    name: "Mt. Marami",
    lat: 14.1986,
    lon: 120.6861,
    elevation: "633",
    location: "Cavite, Maragondon",
    difficulty: 3,
    difficultyText: "Mild",
  },
  {
    id: "talamitam",
    name: "Mt. Talamitam",
    lat: 14.10781,
    lon: 120.75991,
    elevation: "630",
    location: "Batangas, Nasugbu",
    difficulty: 2,
    difficultyText: "Easy",
  },
];

const mountainSelect = document.getElementById("mountainSelect");

mountains.forEach((mountain) => {
  const option = document.createElement("option");
  option.value = mountain.id;
  option.textContent = mountain.name;
  mountainSelect.appendChild(option);
});

mountainSelect.addEventListener("change", (event) => {
  const mId = event.target.value;
  if (!mId) return;
  const selectedMountain = mountains.find((mountain) => mountain.id === mId);
  if (selectedMountain) {
    fetchWeather(selectedMountain);
  }
});
