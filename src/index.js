// * Weather App
import fetchWeather from "./APIFunctions";
import renderData from "./DOMFunctions";

async function getWeather(location) {
  const data = await fetchWeather(location);
  if (data.cod !== 200) {
    return null;
  }
  // * Pick the relevant values from the api
  const {
    weather: [{ main, icon }],
    main: { temp, feels_like: feelsLike, humidity },
    wind: { speed },
    name,
    sys: { country },
  } = data;
  return {
    weather: main,
    icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
    name,
    country,
    temp,
    feelsLike,
    humidity,
    wind: speed,
  };
}

// TODO Set a simple form that take an input
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = form["loc-input"].value;
  const data = await getWeather(location);
  if (data) {
    renderData.success(data);
  } else {
    renderData.error();
  }
});

// TODO Style it! (Kinda long)
