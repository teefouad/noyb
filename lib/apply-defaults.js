"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _getType = _interopRequireDefault(require("./get-type"));

/**
 * Fills an object with default values
 * @param {Object} obj Object to be filled
 * @param {Object} defaults Default values object
 */
var applyDefaults = function applyDefaults(obj, defaults) {
  if (obj === void 0) {
    obj = {};
  }

  if (defaults === void 0) {
    defaults = {};
  }

  return Object.keys((0, _extends3["default"])({}, obj, defaults)).reduce(function (p, n) {
    var _extends2;

    var value;

    if ((0, _getType["default"])(defaults[n]) === 'object') {
      value = applyDefaults(obj[n], defaults[n]);
    } else {
      value = (0, _getType["default"])(obj[n]) !== 'undefined' ? obj[n] : defaults[n];
    }

    return (0, _extends3["default"])({}, p, (_extends2 = {}, _extends2[n] = value, _extends2));
  }, {});
};

var _default = applyDefaults;
exports["default"] = _default;