const today = new Date();
const todayString = today.toLocaleDateString([], {
  day: "numeric",
  month: "long",
  day: "2-digit",
  year: "numeric"
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

function displayWeather(data, mountain) {
  document.getElementById("location").textContent = `${mountain.location}`;
  document.getElementById("difficultyValue").textContent =
    `${mountain.difficulty}`;
  document.getElementById("mountain").textContent = `${mountain.name}`;
  document.getElementById("humidityValue").textContent =
    `${data.main.humidity}`;
  document.getElementById("temperature").textContent = `${data.main.temp}`;
  document.getElementById("feelsLike").textContent = `${data.main.feels_like}`;
  document.getElementById("windValue").textContent = `${data.wind.speed}`;
  document.getElementById("elevationValue").innerHTML = `${mountain.elevation}`;
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
    elevation: "2,922 - 2,930 ",
    location: "Benguet, Kabayan",
    difficulty: "3/9 - 7/9", // Varies by trail
  },
  {
    id: "ugo",
    name: "Mt. Ugo",
    lat: 16.3192,
    lon: 120.802,
    elevation: "2,150 - 2,220",
    location: "Benguet, Itogon",
    difficulty: "5/9",
  },
  {
    id: "maculot",
    name: "Mt. Maculot",
    lat: 13.9212,
    lon: 121.0519,
    elevation: "930 - 957",
    location: "Batangas, Cuenca",
    difficulty: "3/9 - 4/9", // Varies by route
  },
  {
    id: "tapulao",
    name: "Mt. Tapulao",
    lat: 15.481,
    lon: 120.1213,
    elevation: "2,034 - 2,037",
    location: "Zambales, Palauig",
    difficulty: "5/9",
  },
  {
    id: "arayat",
    name: "Mt. Arayat",
    lat: 15.20129,
    lon: 120.74312,
    elevation: "1,026",
    location: "Pampanga, Arayat",
    difficulty: "5/9 - 7/9", // Varies by route
  },
  {
    id: "batulao",
    name: "Mt. Batulao",
    lat: 14.0403,
    lon: 120.802,
    elevation: "693 - 811",
    location: "Batangas, Nasugbu",
    difficulty: "4/9",
  },
  {
    id: "daraitan",
    name: "Mt. Daraitan",
    lat: 14.6131,
    lon: 121.4388,
    elevation: "719 - 739",
    location: "Rizal, Tanay",
    difficulty: "4/9",
  },
  {
    id: "pinatubo",
    name: "Mt. Pinatubo",
    lat: 15.14167,
    lon: 120.35,
    elevation: "1,486",
    location: "Tarlac, Capas",
    difficulty: "2/9",
  },
  {
    id: "marami",
    name: "Mt. Marami",
    lat: 14.1986,
    lon: 120.6861,
    elevation: "633",
    location: "Cavite, Maragondon",
    difficulty: "3/9",
  },
  {
    id: "talamitam",
    name: "Mt. Talamitam",
    lat: 14.10781,
    lon: 120.75991,
    elevation: "630 - 704",
    location: "Batangas, Nasugbu",
    difficulty: "2/9",
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
