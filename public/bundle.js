/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("eval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony import */ var _src_splitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/splitter */ \\\"./src/splitter.js\\\");\\n/* harmony import */ var _src_mover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/mover */ \\\"./src/mover.js\\\");\\n/* harmony import */ var _src_attacheditem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/attacheditem */ \\\"./src/attacheditem.js\\\");\\n\\r\\n\\r\\n\\r\\n\\r\\nvar element = document.querySelector(\\\"#app\\\");\\r\\n\\r\\nvar config = {\\r\\n    numOfPanes: 5\\r\\n}\\r\\n\\r\\nvar splitter = new _src_splitter__WEBPACK_IMPORTED_MODULE_0__[\\\"Splitter\\\"](element, config);\\r\\nsplitter.panes[0].element.style.backgroundColor = \\\"#567\\\";\\r\\nsplitter.panes[1].element.style.backgroundColor = \\\"#675\\\";\\r\\nsplitter.panes[2].element.style.backgroundColor = \\\"#756\\\";\\r\\nif(splitter.panes[3] != undefined) splitter.panes[3].element.style.backgroundColor = \\\"#576\\\";\\r\\nif(splitter.panes[4] != undefined) splitter.panes[4].element.style.backgroundColor = \\\"#765\\\";\\r\\n\\r\\nwindow.test = function test() {\\r\\n    console.log(\\\"Ahoj svet\\\");\\r\\n}\\r\\n\\r\\nlet line = new _src_attacheditem__WEBPACK_IMPORTED_MODULE_2__[\\\"default\\\"]();\\r\\nline.offset = -1;\\r\\nline.element.style.width = \\\"2px\\\";\\r\\nline.element.style.height = \\\"100%\\\";\\r\\nline.element.style.background = \\\"black\\\";\\r\\nelement.appendChild(line.element);\\r\\n\\r\\n/*splitter.panes[1].attachItem(splitter.movers[0]);\\r\\nsplitter.panes[2].attachItem(splitter.movers[1]);\\r\\nsplitter.panes[3].attachItem(splitter.movers[2]);\\r\\nsplitter.panes[4].attachItem(splitter.movers[3]);*/\\r\\nsplitter.panes[1].attachItem(line);\\r\\n\\r\\n/*splitter.panes[0].minWidth = 50;\\r\\nsplitter.panes[1].minWidth = 55;\\r\\nsplitter.panes[2].minWidth = 60;\\r\\nsplitter.panes[3].minWidth = 65;\\r\\nsplitter.panes[4].minWidth = 150;\\r\\n\\r\\nsplitter.panes[0].updateLimits();\\r\\nsplitter.panes[1].updateLimits();\\r\\nsplitter.panes[2].updateLimits();\\r\\nsplitter.panes[3].updateLimits();\\r\\nsplitter.panes[4].updateLimits();*/\\r\\n//# sourceURL=[module]\\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAuanM/OWE3OCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUEwQztBQUNOO0FBQ1U7O0FBRTlDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsc0RBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSx5REFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDIiwiZmlsZSI6Ii4vYXBwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3BsaXR0ZXIgfSBmcm9tIFwiLi9zcmMvc3BsaXR0ZXJcIjtcclxuaW1wb3J0IHsgTW92ZXIgfSBmcm9tIFwiLi9zcmMvbW92ZXJcIjtcclxuaW1wb3J0IEF0dGFjaGVkSXRlbSBmcm9tIFwiLi9zcmMvYXR0YWNoZWRpdGVtXCI7XHJcblxyXG52YXIgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpO1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICAgIG51bU9mUGFuZXM6IDVcclxufVxyXG5cclxudmFyIHNwbGl0dGVyID0gbmV3IFNwbGl0dGVyKGVsZW1lbnQsIGNvbmZpZyk7XHJcbnNwbGl0dGVyLnBhbmVzWzBdLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTY3XCI7XHJcbnNwbGl0dGVyLnBhbmVzWzFdLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNjc1XCI7XHJcbnNwbGl0dGVyLnBhbmVzWzJdLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNzU2XCI7XHJcbmlmKHNwbGl0dGVyLnBhbmVzWzNdICE9IHVuZGVmaW5lZCkgc3BsaXR0ZXIucGFuZXNbM10uZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM1NzZcIjtcclxuaWYoc3BsaXR0ZXIucGFuZXNbNF0gIT0gdW5kZWZpbmVkKSBzcGxpdHRlci5wYW5lc1s0XS5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzc2NVwiO1xyXG5cclxud2luZG93LnRlc3QgPSBmdW5jdGlvbiB0ZXN0KCkge1xyXG4gICAgY29uc29sZS5sb2coXCJBaG9qIHN2ZXRcIik7XHJcbn1cclxuXHJcbmxldCBsaW5lID0gbmV3IEF0dGFjaGVkSXRlbSgpO1xyXG5saW5lLm9mZnNldCA9IC0xO1xyXG5saW5lLmVsZW1lbnQuc3R5bGUud2lkdGggPSBcIjJweFwiO1xyXG5saW5lLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XHJcbmxpbmUuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibGFja1wiO1xyXG5lbGVtZW50LmFwcGVuZENoaWxkKGxpbmUuZWxlbWVudCk7XHJcblxyXG4vKnNwbGl0dGVyLnBhbmVzWzFdLmF0dGFjaEl0ZW0oc3BsaXR0ZXIubW92ZXJzWzBdKTtcclxuc3BsaXR0ZXIucGFuZXNbMl0uYXR0YWNoSXRlbShzcGxpdHRlci5tb3ZlcnNbMV0pO1xyXG5zcGxpdHRlci5wYW5lc1szXS5hdHRhY2hJdGVtKHNwbGl0dGVyLm1vdmVyc1syXSk7XHJcbnNwbGl0dGVyLnBhbmVzWzRdLmF0dGFjaEl0ZW0oc3BsaXR0ZXIubW92ZXJzWzNdKTsqL1xyXG5zcGxpdHRlci5wYW5lc1sxXS5hdHRhY2hJdGVtKGxpbmUpO1xyXG5cclxuLypzcGxpdHRlci5wYW5lc1swXS5taW5XaWR0aCA9IDUwO1xyXG5zcGxpdHRlci5wYW5lc1sxXS5taW5XaWR0aCA9IDU1O1xyXG5zcGxpdHRlci5wYW5lc1syXS5taW5XaWR0aCA9IDYwO1xyXG5zcGxpdHRlci5wYW5lc1szXS5taW5XaWR0aCA9IDY1O1xyXG5zcGxpdHRlci5wYW5lc1s0XS5taW5XaWR0aCA9IDE1MDtcclxuXHJcbnNwbGl0dGVyLnBhbmVzWzBdLnVwZGF0ZUxpbWl0cygpO1xyXG5zcGxpdHRlci5wYW5lc1sxXS51cGRhdGVMaW1pdHMoKTtcclxuc3BsaXR0ZXIucGFuZXNbMl0udXBkYXRlTGltaXRzKCk7XHJcbnNwbGl0dGVyLnBhbmVzWzNdLnVwZGF0ZUxpbWl0cygpO1xyXG5zcGxpdHRlci5wYW5lc1s0XS51cGRhdGVMaW1pdHMoKTsqL1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\\n//# sourceURL=webpack-internal:///./app.js\\n\");\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./src/attacheditem.js":
/*!*****************************!*\
  !*** ./src/attacheditem.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("eval(\"throw new Error(\\\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\\\\\Users\\\\\\\\skvarkaj\\\\\\\\Desktop\\\\\\\\splitter\\\\\\\\src\\\\\\\\attacheditem.js'\\\");//# sourceURL=[module]\\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3NyYy9hdHRhY2hlZGl0ZW0uanMuanMiLCJzb3VyY2VSb290IjoiIn0=\\n//# sourceURL=webpack-internal:///./src/attacheditem.js\\n\");\n\n//# sourceURL=webpack:///./src/attacheditem.js?");

/***/ }),

/***/ "./src/mover.js":
/*!**********************!*\
  !*** ./src/mover.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, exports) {

eval("eval(\"throw new Error(\\\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\\\\\Users\\\\\\\\skvarkaj\\\\\\\\Desktop\\\\\\\\splitter\\\\\\\\src\\\\\\\\mover.js'\\\");//# sourceURL=[module]\\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3NyYy9tb3Zlci5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\\n//# sourceURL=webpack-internal:///./src/mover.js\\n\");\n\n//# sourceURL=webpack:///./src/mover.js?");

/***/ }),

/***/ "./src/splitter.js":
/*!*************************!*\
  !*** ./src/splitter.js ***!
  \*************************/
/*! exports provided: Splitter */
/***/ (function(module, exports) {

eval("eval(\"throw new Error(\\\"Module build failed: Error: ENOENT: no such file or directory, open 'C:\\\\\\\\Users\\\\\\\\skvarkaj\\\\\\\\Desktop\\\\\\\\splitter\\\\\\\\src\\\\\\\\splitter.js'\\\");//# sourceURL=[module]\\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3NyYy9zcGxpdHRlci5qcy5qcyIsInNvdXJjZVJvb3QiOiIifQ==\\n//# sourceURL=webpack-internal:///./src/splitter.js\\n\");\n\n//# sourceURL=webpack:///./src/splitter.js?");

/***/ })

/******/ });