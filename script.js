const today = new Date();
const todayString = today.toLocaleDateString([], {
  day: "numeric",
  month: "long",
  day: "2-digit",
  year: "numeric",
});
const currentTime = new Date();
const currentTimeString = currentTime.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});
document.getElementById("dayDisplay").textContent = todayString;
document.getElementById("timeDisplay").textContent = currentTimeString;
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

function getHumidity(humidityScore) {
  switch (true) {
    case humidityScore < 30:
      return "Very Dry";
      break;
    case humidityScore >= 30 && humidityScore < 49:
      return "Dry";
      break;
    case humidityScore >= 50 && humidityScore < 70:
      return "Normal";
      break;
    case humidityScore >= 70 && humidityScore < 85:
      return "Humid";
      break;
    case humidityScore >= 85 && humidityScore < 95:
      return "Very Humid";
      break;
    default:
      return "Foggy";
  }
}

function humidityAdvice(humidity) {
  switch (humidity) {
    case "Very Dry":
      return "Extremely dry air. High fire risk on open slopes. Drink water frequently.You're losing moisture faster than you realize. Lip balm and moisturizer strongly recommended.";
      break;
    case "Dry":
      return "Crisp and pleasant. Ideal hiking weather! Sweat evaporates quickly keeping you cool. Still remember to hydrate regularly, dry air masks dehydration.";
      break;
    case "Normal":
      return "Typical forest humidity. Comfortable for most hikers. Trail conditions should be normal. Light mist possible near summits.";
      break;
    case "Humid":
      return "Sticky and damp. Sweat won't evaporate well, you'll feel warmer than actual temperature. Trails may be slippery. Wear moisture wicking clothing.";
      break;
    case "Very Humid":
      return "Heavy air, likely foggy. Expect limited visibility and possible sea of clouds. Jacket and gear will stay wet. Protect electronics from moisture.";
      break;
    default:
      return "Dense fog and drizzle. Visibility severely reduced. Stay on marked trails. Risk of hypothermia even in moderate temperatures. Waterproof layers essential.";
  }
}

function getDifficulty(difficulty) {
  switch (difficulty) {
    case 1:
      return "very Easy";
      break;
    case 2:
      return "Easy";
      break;
    case 3:
      return "Mild";
      break;
    case 4:
      return "Average";
      break;
    case 5:
      return "Moderate";
      break;
    case 6:
      return "Challenging";
      break;
    case 7:
      return "Difficult";
      break;
    case 8:
      return "Strenuous";
      break;
    case 9:
      return "Technical";
      break;
    default:
      return "Could not get difficulty";
  }
}

function displayWeather(data, mountain) {
  document.getElementById("location").textContent = `${mountain.location}`;
  const mountainDifficulty = mountain.difficulty;
  const difficultyValue = document.getElementById("difficultyValue");
  difficultyValue.textContent = `${mountain.difficulty}/9`;
  document.getElementById("hikabilityDescription").textContent =
    getDifficulty(mountainDifficulty);
  document.getElementById("mountain").textContent = `${mountain.name}`;
  const humidityScore = data.main.humidity;
  const humidityCondition = getHumidity(data.main.humidity);
  document.getElementById("humidityValue").textContent = `${humidityScore}%`;
  document.getElementById("humidityResult").textContent =
    getHumidity(humidityScore);
  document.getElementById("humidityDescription").textContent =
    humidityAdvice(humidityCondition);
  document.getElementById("temperature").textContent = `${data.main.temp}`;
  document.getElementById("feelsLike").textContent = `${data.main.feels_like}`;
  document.getElementById("windValue").textContent = `${data.wind.speed}`;
  document.getElementById("elevationValue").innerHTML = `${mountain.elevation}m`;
  const cloudiness = capitalizeFirstChar(data.weather[0].description);
  document.getElementById("cloudinessValue").textContent = cloudiness;
  const mountainSunrise = new Date(data.sys.sunrise * 1000);
  const sunriseTimeString = mountainSunrise.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("sunriseValue").textContent = sunriseTimeString;
  const mountainSunset = new Date(data.sys.sunset * 1000);
  const sunsetTimeString = mountainSunset.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("sunsetValue").textContent = sunsetTimeString;
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
  },
  {
    id: "ugo",
    name: "Mt. Ugo",
    lat: 16.3192,
    lon: 120.802,
    elevation: "2,150",
    location: "Benguet, Itogon",
    difficulty: 5,
  },
  {
    id: "maculot",
    name: "Mt. Maculot",
    lat: 13.9212,
    lon: 121.0519,
    elevation: "930",
    location: "Batangas, Cuenca",
    difficulty: 3, // Varies by route
  },
  {
    id: "tapulao",
    name: "Mt. Tapulao",
    lat: 15.481,
    lon: 120.1213,
    elevation: "2,034",
    location: "Zambales, Palauig",
    difficulty: 5,
  },
  {
    id: "arayat",
    name: "Mt. Arayat",
    lat: 15.20129,
    lon: 120.74312,
    elevation: "1,026",
    location: "Pampanga, Arayat",
    difficulty: 5, // Varies by route
  },
  {
    id: "batulao",
    name: "Mt. Batulao",
    lat: 14.0403,
    lon: 120.802,
    elevation: "693",
    location: "Batangas, Nasugbu",
    difficulty: 4,
  },
  {
    id: "daraitan",
    name: "Mt. Daraitan",
    lat: 14.6131,
    lon: 121.4388,
    elevation: "719",
    location: "Rizal, Tanay",
    difficulty: 4,
  },
  {
    id: "pinatubo",
    name: "Mt. Pinatubo",
    lat: 15.14167,
    lon: 120.35,
    elevation: "1,486",
    location: "Tarlac, Capas",
    difficulty: 2,
  },
  {
    id: "marami",
    name: "Mt. Marami",
    lat: 14.1986,
    lon: 120.6861,
    elevation: "633",
    location: "Cavite, Maragondon",
    difficulty: 3,
  },
  {
    id: "talamitam",
    name: "Mt. Talamitam",
    lat: 14.10781,
    lon: 120.75991,
    elevation: "630",
    location: "Batangas, Nasugbu",
    difficulty: 2,
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
