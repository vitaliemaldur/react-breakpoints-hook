"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentWidth = useCurrentWidth;
exports.useBreakpoints = useBreakpoints;
exports["default"] = void 0;

var _react = require("react");

var _browserMonads = require("browser-monads");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getWidth = function getWidth() {
  return _browserMonads.window.innerWidth || _browserMonads.document.documentElement.clientWidth || _browserMonads.document.body.clientWidth;
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

    _browserMonads.window.addEventListener('resize', resizeListener);

    return function () {
      _browserMonads.window.removeEventListener('resize', resizeListener);
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
exports["default"] = _default;
