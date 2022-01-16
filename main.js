/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/APIFunctions.js":
/*!*****************************!*\
  !*** ./src/APIFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fetchWeather)
/* harmony export */ });
// ! Exposed API
const WEATHER_API_KEY = `b8e5a03721491c54fbac09f715654079`;
//  Add function that can take location and return weather data. CLG for now
async function fetchWeather(
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


/***/ }),

/***/ "./src/DOMFunctions.js":
/*!*****************************!*\
  !*** ./src/DOMFunctions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// TODO display the information

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
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
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _APIFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./APIFunctions */ "./src/APIFunctions.js");
/* harmony import */ var _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMFunctions */ "./src/DOMFunctions.js");
// * Weather App



async function getWeather(location) {
  const data = await (0,_APIFunctions__WEBPACK_IMPORTED_MODULE_0__["default"])(location);
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
    _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__["default"].success(data);
  } else {
    _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__["default"].error();
  }
});

// TODO Style it! (Kinda long)

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxTQUFTLFNBQVMsSUFBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGNBQWMsaUNBQWlDO0FBQy9DO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsZUFBZTtBQUNmO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7QUFDQSxvQkFBb0IsVUFBVTtBQUM5QjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTtBQUNBLDBCQUEwQixXQUFXO0FBQ3JDLHNCQUFzQixVQUFVLElBQUksYUFBYTtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMsRUFBQzs7Ozs7OztVQ3hDRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzBDO0FBQ0Y7O0FBRXhDO0FBQ0EscUJBQXFCLHlEQUFZO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsWUFBWTtBQUM1QixZQUFZLHVDQUF1QztBQUNuRCxZQUFZLE9BQU87QUFDbkI7QUFDQSxXQUFXLFNBQVM7QUFDcEIsSUFBSTtBQUNKO0FBQ0E7QUFDQSw4Q0FBOEMsS0FBSztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksNkRBQWtCO0FBQ3RCLElBQUk7QUFDSixJQUFJLDJEQUFnQjtBQUNwQjtBQUNBLENBQUM7O0FBRUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9BUElGdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvRE9NRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gISBFeHBvc2VkIEFQSVxuY29uc3QgV0VBVEhFUl9BUElfS0VZID0gYGI4ZTVhMDM3MjE0OTFjNTRmYmFjMDlmNzE1NjU0MDc5YDtcbi8vICBBZGQgZnVuY3Rpb24gdGhhdCBjYW4gdGFrZSBsb2NhdGlvbiBhbmQgcmV0dXJuIHdlYXRoZXIgZGF0YS4gQ0xHIGZvciBub3dcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlcihcbiAgbG9jYXRpb24gPSBcInNhZGZkY1wiLFxuICBhcGkgPSBXRUFUSEVSX0FQSV9LRVlcbikge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2xvY2F0aW9ufSZhcHBpZD0ke2FwaX1gLFxuICAgICAge1xuICAgICAgICBtb2RlOiBcImNvcnNcIixcbiAgICAgIH1cbiAgICApO1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZSk7XG4gIH1cbn1cbiIsIi8vIFRPRE8gZGlzcGxheSB0aGUgaW5mb3JtYXRpb25cblxuZXhwb3J0IGRlZmF1bHQge1xuICBtYWluOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2I3dlYXRoZXItd3JhcHBlclwiKSxcbiAgcmVuZGVyRXJyb3IoKSB7XG4gICAgdGhpcy5tYWluLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXY+Tm8gRGF0YS4gUGxlYXNlIHRyeSBhZ2FpbiA8L2Rpdj5gO1xuICB9LFxuICByZW5kZXJXZWF0aGVyKGRhdGEpIHtcbiAgICB0aGlzLm1haW4uaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDE+JHsoZGF0YS50ZW1wIC0gMjczLjE1KS50b0ZpeGVkKDIpfSA8c3BhbiBjbGFzcz1cInRlbXBcIj7CsEM8L3NwYW4+PC9oMT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj4gXG4gICAgICAgICAgICA8cCBjbGFzcz1cImJvcmRlclwiPiR7KCg5IC8gNSkgKiAoZGF0YS50ZW1wIC0gMjczLjE1KSArIDMyKS50b0ZpeGVkKFxuICAgICAgICAgICAgICAyXG4gICAgICAgICAgICApfSA8c3BhbiBjbGFzcz1cInRlbXBcIj7CsEY8L3NwYW4+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cD4gJHtkYXRhLndlYXRoZXJ9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGltZyBzcmM9XCIke2RhdGEuaWNvbn1cIj4gXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViLWRlc2MgYm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgPHAgPkZlZWxzIExpa2UgICR7KGRhdGEuZmVlbHNMaWtlIC0gMjczLjE1KS50b0ZpeGVkKFxuICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICl9IDxzcGFuIGNsYXNzPVwidGVtcFwiPsKwQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHA+SHVtaWRpdHkgJHtkYXRhLmh1bWlkaXR5fSU8L3A+ICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1kZXNjXCI+XG4gICAgICAgICAgICAgICAgPHA+V2luZCAke2RhdGEud2luZH0gbS9zPC9wPiBcbiAgICAgICAgICAgICAgICA8cD4gJHtkYXRhLm5hbWV9LCAke2RhdGEuY291bnRyeX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfSxcbiAgZ2V0IHN1Y2Nlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyV2VhdGhlcjtcbiAgfSxcbiAgZ2V0IGVycm9yKCkge1xuICAgIHJldHVybiB0aGlzLnJlbmRlckVycm9yO1xuICB9LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gKiBXZWF0aGVyIEFwcFxuaW1wb3J0IGZldGNoV2VhdGhlciBmcm9tIFwiLi9BUElGdW5jdGlvbnNcIjtcbmltcG9ydCByZW5kZXJEYXRhIGZyb20gXCIuL0RPTUZ1bmN0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXIobG9jYXRpb24pO1xuICBpZiAoZGF0YS5jb2QgIT09IDIwMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vICogUGljayB0aGUgcmVsZXZhbnQgdmFsdWVzIGZyb20gdGhlIGFwaVxuICBjb25zdCB7XG4gICAgd2VhdGhlcjogW3sgbWFpbiwgaWNvbiB9XSxcbiAgICBtYWluOiB7IHRlbXAsIGZlZWxzX2xpa2U6IGZlZWxzTGlrZSwgaHVtaWRpdHkgfSxcbiAgICB3aW5kOiB7IHNwZWVkIH0sXG4gICAgbmFtZSxcbiAgICBzeXM6IHsgY291bnRyeSB9LFxuICB9ID0gZGF0YTtcbiAgcmV0dXJuIHtcbiAgICB3ZWF0aGVyOiBtYWluLFxuICAgIGljb246IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2ljb259QDJ4LnBuZ2AsXG4gICAgbmFtZSxcbiAgICBjb3VudHJ5LFxuICAgIHRlbXAsXG4gICAgZmVlbHNMaWtlLFxuICAgIGh1bWlkaXR5LFxuICAgIHdpbmQ6IHNwZWVkLFxuICB9O1xufVxuXG4vLyBUT0RPIFNldCBhIHNpbXBsZSBmb3JtIHRoYXQgdGFrZSBhbiBpbnB1dFxuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBsb2NhdGlvbiA9IGZvcm1bXCJsb2MtaW5wdXRcIl0udmFsdWU7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcbiAgaWYgKGRhdGEpIHtcbiAgICByZW5kZXJEYXRhLnN1Y2Nlc3MoZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgcmVuZGVyRGF0YS5lcnJvcigpO1xuICB9XG59KTtcblxuLy8gVE9ETyBTdHlsZSBpdCEgKEtpbmRhIGxvbmcpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=