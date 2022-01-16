// TODO display the information

export default {
  main: document.querySelector("div#weather-wrapper"),
  renderError() {
    this.main.innerHTML = `
      <div>No Data. Please try again </div>`;
  },
  renderWeather(data) {
    this.main.innerHTML = `
        <h1>${(data.temp - 273.15).toFixed(2)} <span class="temp">°C</span></h1>
        <div class="desc"> 
            <p class="border">${((9 / 5) * (data.temp - 273.15) + 32).toFixed(
              2
            )} <span class="temp">°F</span>
            </p>
            <p> ${data.weather}</p>
        </div>
        <img src="${data.icon}"> 
        <div class="desc">
            <div class="sub-desc border">
                <p >Feels Like  ${(data.feelsLike - 273.15).toFixed(
                  2
                )} <span class="temp">°C</span>
                </p>
                <p>Humidity ${data.humidity}%</p>        
            </div>
            <div class="sub-desc">
                <p>Wind ${data.wind} m/s</p> 
                <p> ${data.name}, ${data.country}</p>
            </div>
        </div>
    `;
  },
  get success() {
    return this.renderWeather;
  },
  get error() {
    return this.renderError;
  },
};
