"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _getType = _interopRequireDefault(require("./get-type"));

/**
 * Deep-copies an object or an array.
 * @param   {Object|Array}  obj       Object or Array to copy.
 * @return  {Object|Array}            Copied Object or Array.
 */
var deepCopy = function deepCopy(obj) {
  var type = (0, _getType["default"])(obj);

  if (type === 'object' || type === 'array') {
    var newObj = type === 'array' ? [] : {};
    Object.keys(obj).forEach(function (key) {
      if (['object', 'array'].includes((0, _getType["default"])(obj[key]))) {
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  }

  return obj;
};

var _default = deepCopy;
exports["default"] = _default;