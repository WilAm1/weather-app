// * Weather App

// ! Exposed API
const WEATHER_API_KEY = `b8e5a03721491c54fbac09f715654079`;
// TODO Add function that can take location and return weather data. CLG for now
const fetchWeather = async (api, location = "Manila") => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`,
      {
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("I ran!");
    throw new Error("Error", e);
  }
};

// TODO Add function that process that data (parse the json file)
async function getWeather() {
  try {
    const data = await fetchWeather(WEATHER_API_KEY);
    // ? Pick the relevant values from the api
    console.log(data);
    const {
      weather: [{ main, description, icon }],
      name,
      sys: { country, sunrise, sunset },
    } = data;
    return { weather: main, description, icon, name, country, sunrise, sunset };
  } catch (e) {
    console.log(e);
    throw new Error("error", e);
  }
}
// getWeather().then((data) => {
//   console.table(data);
// });
// TODO Set a simple form that take an input
// TODO display the information
// TODO Style it! (Kinda long)
