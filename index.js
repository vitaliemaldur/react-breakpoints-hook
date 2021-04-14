"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentWidth = useCurrentWidth;
exports.useBreakpoints = useBreakpoints;
exports.default = void 0;

var _react = require("react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getWidth = function getWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

function useCurrentWidth() {
  var _useState = (0, _react.useState)(getWidth()),
      _useState2 = _slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];

  (0, _react.useEffect)(function () {
    var timeoutId = null;

    var resizeListener = function resizeListener() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        return setWidth(getWidth());
      }, 150);
    };

    window.addEventListener('resize', resizeListener);
    return function () {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
  return width;
}

function useBreakpoints(breakpoints) {
  if (_typeof(breakpoints) !== 'object' || breakpoints === null) {
    throw new Error('Invalid configuration object!');
  }

  var width = useCurrentWidth();
  var result = {};

  for (var _i2 = 0, _Object$keys = Object.keys(breakpoints); _i2 < _Object$keys.length; _i2++) {
    var key = _Object$keys[_i2];

    if (breakpoints[key].min !== parseInt(breakpoints[key].min, 10)) {
      throw new Error('Min value should be an integer!');
    }

    if (breakpoints[key].max && breakpoints[key].max !== parseInt(breakpoints[key].max, 10)) {
      throw new Error('Max value should be an integer!');
    }

    if (breakpoints[key].max && breakpoints[key].min > breakpoints[key].max) {
      throw new Error('Min value should be lower or equal with max value!');
    }

    result[key] = width >= breakpoints[key].min && (!breakpoints[key].max || width <= breakpoints[key].max);
  }

  return result;
}

var _default = useBreakpoints;
exports.default = _default;
