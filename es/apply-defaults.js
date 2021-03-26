import _extends from "@babel/runtime/helpers/esm/extends";
import getType from './get-type';
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

  return Object.keys(_extends({}, obj, defaults)).reduce(function (p, n) {
    var _extends2;

    var value;

    if (getType(defaults[n]) === 'object') {
      value = applyDefaults(obj[n], defaults[n]);
    } else {
      value = getType(obj[n]) !== 'undefined' ? obj[n] : defaults[n];
    }

    return _extends({}, p, (_extends2 = {}, _extends2[n] = value, _extends2));
  }, {});
};

export default applyDefaults;