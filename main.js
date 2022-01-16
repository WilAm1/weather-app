/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxTQUFTLFNBQVMsSUFBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IseUJBQXlCO0FBQ3pDO0FBQ0EsV0FBVywwQkFBMEI7QUFDckMsSUFBSTtBQUNKLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCLGdCQUFnQixpQkFBaUI7QUFDakMscURBQXFELFVBQVU7QUFDL0QsZ0JBQWdCLFVBQVU7QUFDMUIsZ0JBQWdCLGFBQWE7QUFDN0IsZ0JBQWdCLGFBQWE7QUFDN0IsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKiBXZWF0aGVyIEFwcFxuXG4vLyAhIEV4cG9zZWQgQVBJXG5jb25zdCBXRUFUSEVSX0FQSV9LRVkgPSBgYjhlNWEwMzcyMTQ5MWM1NGZiYWMwOWY3MTU2NTQwNzlgO1xuLy8gVE9ETyBBZGQgZnVuY3Rpb24gdGhhdCBjYW4gdGFrZSBsb2NhdGlvbiBhbmQgcmV0dXJuIHdlYXRoZXIgZGF0YS4gQ0xHIGZvciBub3dcbmNvbnN0IGZldGNoV2VhdGhlciA9IGFzeW5jIChhcGksIGxvY2F0aW9uID0gXCJzYWRmZGNcIikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZhcHBpZD0ke2FwaX1gLFxuICAgICAge1xuICAgICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZSk7XG4gIH1cbn07XG5cbi8vIFRPRE8gQWRkIGZ1bmN0aW9uIHRoYXQgcHJvY2VzcyB0aGF0IGRhdGEgKHBhcnNlIHRoZSBqc29uIGZpbGUpXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXIoV0VBVEhFUl9BUElfS0VZLCBsb2NhdGlvbik7XG4gIGlmIChkYXRhLmNvZCAhPT0gMjAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gPyBQaWNrIHRoZSByZWxldmFudCB2YWx1ZXMgZnJvbSB0aGUgYXBpXG4gIGNvbnN0IHtcbiAgICB3ZWF0aGVyOiBbeyBtYWluLCBkZXNjcmlwdGlvbiwgaWNvbiB9XSxcbiAgICBuYW1lLFxuICAgIHN5czogeyBjb3VudHJ5LCBzdW5yaXNlLCBzdW5zZXQgfSxcbiAgfSA9IGRhdGE7XG4gIHJldHVybiB7IHdlYXRoZXI6IG1haW4sIGRlc2NyaXB0aW9uLCBpY29uLCBuYW1lLCBjb3VudHJ5LCBzdW5yaXNlLCBzdW5zZXQgfTtcbn1cblxuLy8gVE9ETyBTZXQgYSBzaW1wbGUgZm9ybSB0aGF0IHRha2UgYW4gaW5wdXRcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKTtcbmNvbnN0IHdlYXRoZXJXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImRpdiN3ZWF0aGVyLXdyYXBwZXJcIik7XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGxvY2F0aW9uID0gZm9ybVtcImxvYy1pbnB1dFwiXS52YWx1ZTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFdlYXRoZXIobG9jYXRpb24pO1xuICBpZiAoZGF0YSkge1xuICAgIHJlbmRlcldlYXRoZXIoZGF0YSk7XG4gIH1cbiAgcmVuZGVyRXJyb3IoKTtcbn0pO1xuZnVuY3Rpb24gcmVuZGVyRXJyb3IoKSB7XG4gIHdlYXRoZXJXcmFwLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2Pk5vIERhdGEuIFBsZWFzZSB0cnkgYWdhaW4gPC9kaXY+YDtcbn1cbi8vIFRPRE8gZGlzcGxheSB0aGUgaW5mb3JtYXRpb25cbmZ1bmN0aW9uIHJlbmRlcldlYXRoZXIoZGF0YSkge1xuICB3ZWF0aGVyV3JhcC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXY+ICR7ZGF0YS53ZWF0aGVyfTwvZGl2PlxuICAgICAgICA8ZGl2PiAke2RhdGEuZGVzY3JpcHRpb259PC9kaXY+XG4gICAgICAgIDxpbWcgc3JjPVwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vJHtkYXRhLmljb259QDJ4LnBuZ1wiPiBcbiAgICAgICAgPGRpdj4gJHtkYXRhLm5hbWV9PC9kaXY+XG4gICAgICAgIDxkaXY+ICR7ZGF0YS5jb3VudHJ5fTwvZGl2PlxuICAgICAgICA8ZGl2PiAke2RhdGEuc3VucmlzZX08L2Rpdj5cbiAgICAgICAgPGRpdj4gJHtkYXRhLnN1bnNldH08L2Rpdj5cbiAgICBgO1xufVxuLy8gVE9ETyBTdHlsZSBpdCEgKEtpbmRhIGxvbmcpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=