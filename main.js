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
// * displays the information

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  main: document.querySelector("div#weather-wrapper"),
  renderError(invalidLocation) {
    this.main.innerHTML = `
      <p>Entered value "${invalidLocation}"</p>
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

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = form["loc-input"].value;
  const data = await getWeather(location);
  if (data) {
    _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__["default"].success(data);
  } else {
    _DOMFunctions__WEBPACK_IMPORTED_MODULE_1__["default"].error(location);
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxTQUFTLFNBQVMsSUFBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOztBQUVBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGdCQUFnQjtBQUMxQztBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsY0FBYyxpQ0FBaUM7QUFDL0M7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxrQkFBa0IsYUFBYTtBQUMvQjtBQUNBLG9CQUFvQixVQUFVO0FBQzlCO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQSw4QkFBOEIsY0FBYztBQUM1QztBQUNBO0FBQ0EsMEJBQTBCLFdBQVc7QUFDckMsc0JBQXNCLFVBQVUsSUFBSSxhQUFhO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQyxFQUFDOzs7Ozs7O1VDekNGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDMEM7QUFDRjs7QUFFeEM7QUFDQSxxQkFBcUIseURBQVk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCLFlBQVksdUNBQXVDO0FBQ25ELFlBQVksT0FBTztBQUNuQjtBQUNBLFdBQVcsU0FBUztBQUNwQixJQUFJO0FBQ0o7QUFDQTtBQUNBLDhDQUE4QyxLQUFLO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw2REFBa0I7QUFDdEIsSUFBSTtBQUNKLElBQUksMkRBQWdCO0FBQ3BCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL0FQSUZ1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9ET01GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAhIEV4cG9zZWQgQVBJXG5jb25zdCBXRUFUSEVSX0FQSV9LRVkgPSBgYjhlNWEwMzcyMTQ5MWM1NGZiYWMwOWY3MTU2NTQwNzlgO1xuLy8gIEFkZCBmdW5jdGlvbiB0aGF0IGNhbiB0YWtlIGxvY2F0aW9uIGFuZCByZXR1cm4gd2VhdGhlciBkYXRhLiBDTEcgZm9yIG5vd1xuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVyKFxuICBsb2NhdGlvbiA9IFwic2FkZmRjXCIsXG4gIGFwaSA9IFdFQVRIRVJfQVBJX0tFWVxuKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7bG9jYXRpb259JmFwcGlkPSR7YXBpfWAsXG4gICAgICB7XG4gICAgICAgIG1vZGU6IFwiY29yc1wiLFxuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihlKTtcbiAgfVxufVxuIiwiLy8gKiBkaXNwbGF5cyB0aGUgaW5mb3JtYXRpb25cblxuZXhwb3J0IGRlZmF1bHQge1xuICBtYWluOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2I3dlYXRoZXItd3JhcHBlclwiKSxcbiAgcmVuZGVyRXJyb3IoaW52YWxpZExvY2F0aW9uKSB7XG4gICAgdGhpcy5tYWluLmlubmVySFRNTCA9IGBcbiAgICAgIDxwPkVudGVyZWQgdmFsdWUgXCIke2ludmFsaWRMb2NhdGlvbn1cIjwvcD5cbiAgICAgIDxkaXY+Tm8gRGF0YS4gUGxlYXNlIHRyeSBhZ2FpbiA8L2Rpdj5gO1xuICB9LFxuICByZW5kZXJXZWF0aGVyKGRhdGEpIHtcbiAgICB0aGlzLm1haW4uaW5uZXJIVE1MID0gYFxuICAgICAgICA8aDE+JHsoZGF0YS50ZW1wIC0gMjczLjE1KS50b0ZpeGVkKDIpfSA8c3BhbiBjbGFzcz1cInRlbXBcIj7CsEM8L3NwYW4+PC9oMT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NcIj4gXG4gICAgICAgICAgICA8cCBjbGFzcz1cImJvcmRlclwiPiR7KCg5IC8gNSkgKiAoZGF0YS50ZW1wIC0gMjczLjE1KSArIDMyKS50b0ZpeGVkKFxuICAgICAgICAgICAgICAyXG4gICAgICAgICAgICApfSA8c3BhbiBjbGFzcz1cInRlbXBcIj7CsEY8L3NwYW4+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cD4gJHtkYXRhLndlYXRoZXJ9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGltZyBzcmM9XCIke2RhdGEuaWNvbn1cIj4gXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ViLWRlc2MgYm9yZGVyXCI+XG4gICAgICAgICAgICAgICAgPHAgPkZlZWxzIExpa2UgICR7KGRhdGEuZmVlbHNMaWtlIC0gMjczLjE1KS50b0ZpeGVkKFxuICAgICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICAgICl9IDxzcGFuIGNsYXNzPVwidGVtcFwiPsKwQzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHA+SHVtaWRpdHkgJHtkYXRhLmh1bWlkaXR5fSU8L3A+ICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1kZXNjXCI+XG4gICAgICAgICAgICAgICAgPHA+V2luZCAke2RhdGEud2luZH0gbS9zPC9wPiBcbiAgICAgICAgICAgICAgICA8cD4gJHtkYXRhLm5hbWV9LCAke2RhdGEuY291bnRyeX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgfSxcbiAgZ2V0IHN1Y2Nlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyV2VhdGhlcjtcbiAgfSxcbiAgZ2V0IGVycm9yKCkge1xuICAgIHJldHVybiB0aGlzLnJlbmRlckVycm9yO1xuICB9LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gKiBXZWF0aGVyIEFwcFxuaW1wb3J0IGZldGNoV2VhdGhlciBmcm9tIFwiLi9BUElGdW5jdGlvbnNcIjtcbmltcG9ydCByZW5kZXJEYXRhIGZyb20gXCIuL0RPTUZ1bmN0aW9uc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyKGxvY2F0aW9uKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBmZXRjaFdlYXRoZXIobG9jYXRpb24pO1xuICBpZiAoZGF0YS5jb2QgIT09IDIwMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vICogUGljayB0aGUgcmVsZXZhbnQgdmFsdWVzIGZyb20gdGhlIGFwaVxuICBjb25zdCB7XG4gICAgd2VhdGhlcjogW3sgbWFpbiwgaWNvbiB9XSxcbiAgICBtYWluOiB7IHRlbXAsIGZlZWxzX2xpa2U6IGZlZWxzTGlrZSwgaHVtaWRpdHkgfSxcbiAgICB3aW5kOiB7IHNwZWVkIH0sXG4gICAgbmFtZSxcbiAgICBzeXM6IHsgY291bnRyeSB9LFxuICB9ID0gZGF0YTtcbiAgcmV0dXJuIHtcbiAgICB3ZWF0aGVyOiBtYWluLFxuICAgIGljb246IGBodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2ljb259QDJ4LnBuZ2AsXG4gICAgbmFtZSxcbiAgICBjb3VudHJ5LFxuICAgIHRlbXAsXG4gICAgZmVlbHNMaWtlLFxuICAgIGh1bWlkaXR5LFxuICAgIHdpbmQ6IHNwZWVkLFxuICB9O1xufVxuXG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYXN5bmMgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBsb2NhdGlvbiA9IGZvcm1bXCJsb2MtaW5wdXRcIl0udmFsdWU7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBnZXRXZWF0aGVyKGxvY2F0aW9uKTtcbiAgaWYgKGRhdGEpIHtcbiAgICByZW5kZXJEYXRhLnN1Y2Nlc3MoZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgcmVuZGVyRGF0YS5lcnJvcihsb2NhdGlvbik7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9