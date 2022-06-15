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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuyerUids = getBuyerUids;
exports.loadData = loadData;

var commons = _interopRequireWildcard(__webpack_require__(1));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * This script returns the ssp buyer user id's. 
 * Usage: 
 * Load the script on the page from jsDelivr <TODO update url here>
 * window.pbs.getBuyerUids(function(error, uids) {
 *    // use uids here
 * })
 */
window.pbs = window.pbs || {};
window.pbs.getBuyerUids = getBuyerUids;
var ENDPOINT = 'https://prebid.adnxs.com/pbs/v1/getuids';
var STORAGE_KEY = 'ssp-buyeruids';
var REFRESH_IN_DAYS = 14;
/**
 * This functions calls the callback when buyer userid's is ready
 * @param {function} callback 
 */

function getBuyerUids(callback) {
  var uidData = commons.getDataFromLocalStorage(STORAGE_KEY);

  if (hasInvalidData(uidData)) {
    loadData(callback);
  } else {
    try {
      uidData = JSON.parse(uidData);
    } catch (e) {
      callback(e, null);
      return;
    }

    delete uidData.lastUpdated;
    callback(null, uidData);
  }
}
/**
 * Gets the data from prebid server getuid endpoint and store it in local storage
 * @param {function} callback 
 */


function loadData(callback) {
  function saveData(response) {
    try {
      response = JSON.parse(response);
      response['lastUpdated'] = commons.timestamp();
      commons.setDataInLocalStorage(STORAGE_KEY, JSON.stringify(response));
      delete response.lastUpdated;
      callback(null, response);
    } catch (e) {
      callback(e, null);
    }
  }

  var uidData = commons.getDataFromLocalStorage(STORAGE_KEY);

  if (hasInvalidData(uidData)) {
    commons.ajax(ENDPOINT, saveData, null, {
      withCredentials: true
    });
  }
}
/**
 * Check whether buyer id data is not null and is not expired
 * @param {Object} uidData 
 * @returns {boolean}
 */


function hasInvalidData(uidData) {
  return !uidData || commons.timestamp() > uidData.lastUpdated + REFRESH_IN_DAYS * 24 * 60 * 60 * 1000;
}

function noop() {}

loadData(noop);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDataInLocalStorage = setDataInLocalStorage;
exports.getDataFromLocalStorage = getDataFromLocalStorage;
exports.hasLocalStorage = hasLocalStorage;
exports.timestamp = timestamp;
exports.ajax = ajax;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Store data in local storage
 * @param {string} key 
 * @param {string} value 
 */
function setDataInLocalStorage(key, value) {
  if (hasLocalStorage()) {
    window.localStorage.setItem(key, value);
  }
}
/**
 * Get data from local storage
 * @param {string} key 
 */


function getDataFromLocalStorage(key) {
  if (hasLocalStorage()) {
    return window.localStorage.getItem(key);
  }
}
/**
 * Check local storage is supported or not
 */


function hasLocalStorage() {
  try {
    return !!window.localStorage;
  } catch (e) {
    console.log('Local storage api disabled');
  }
}

function timestamp() {
  return new Date().getTime();
}

function ajax(url, callback, data) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  try {
    var timeout = 3000;
    var x;
    var method = options.method || (data ? 'POST' : 'GET');
    var callbacks = _typeof(callback) === 'object' ? callback : {
      success: function success() {
        console.log('xhr success');
      },
      error: function error(e) {
        console.log('xhr error', null, e);
      }
    };

    if (typeof callback === 'function') {
      callbacks.success = callback;
    }

    x = new window.XMLHttpRequest();

    x.onreadystatechange = function () {
      if (x.readyState === 4) {
        var status = x.status;

        if (status >= 200 && status < 300 || status === 304) {
          callbacks.success(x.responseText, x);
        } else {
          callbacks.error(x.statusText, x);
        }
      }
    };

    x.ontimeout = function () {
      console.log('xhr timeout after ', x.timeout, 'ms');
    };

    if (method === 'GET' && data) {
      var urlInfo = parseURL(url, options);

      _extends(urlInfo.search, data);

      url = formatURL(urlInfo);
    }

    x.open(method, url); // IE needs timoeut to be set after open - see #1410

    x.timeout = timeout;

    if (options.withCredentials) {
      x.withCredentials = true;
    }

    if (options.preflight) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    x.setRequestHeader('Content-Type', options.contentType || 'text/plain');

    if (method === 'POST' && data) {
      x.send(data);
    } else {
      x.send();
    }
  } catch (error) {
    console.log('xhr construction', error);
  }
}

/***/ })
/******/ ]);