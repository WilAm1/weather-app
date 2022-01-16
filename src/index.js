// * Weather App

// ! Exposed API
const WEATHER_API_KEY = `b8e5a03721491c54fbac09f715654079`;
// TODO Add function that can take location and return weather data. CLG for now
const fetchWeather = async (api, location = "sadfdc") => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`,
      {
        mode: "cors",
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

// TODO Add function that process that data (parse the json file)
async function getWeather(location) {
  const data = await fetchWeather(WEATHER_API_KEY, location);
  if (data.cod !== 200) {
    return null;
  }
  // ? Pick the relevant values from the api
  const {
    weather: [{ main, description, icon }],
    name,
    sys: { country, sunrise, sunset },
  } = data;
  return { weather: main, description, icon, name, country, sunrise, sunset };
}

// TODO Set a simple form that take an input
const form = document.querySelector("form");
const weatherWrap = document.querySelector("div#weather-wrapper");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = form["loc-input"].value;
  const data = await getWeather(location);
  if (data) {
    renderWeather(data);
  }
  renderError();
});
function renderError() {
  weatherWrap.innerHTML = `
    <div>No Data. Please try again </div>`;
}
// TODO display the information
function renderWeather(data) {
  weatherWrap.innerHTML = `
        <div> ${data.weather}</div>
        <div> ${data.description}</div>
        <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png"> 
        <div> ${data.name}</div>
        <div> ${data.country}</div>
        <div> ${data.sunrise}</div>
        <div> ${data.sunset}</div>
    `;
}
// TODO Style it! (Kinda long)
