// ! Exposed API
const WEATHER_API_KEY = `b8e5a03721491c54fbac09f715654079`;
//  Add function that can take location and return weather data. CLG for now
export default async function fetchWeather(
  location = "sadfdc",
  api = WEATHER_API_KEY
) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`,
      {
        mode: "cors",
      }
    );
    return response.json();
  } catch (e) {
    throw new Error(e);
  }
}
