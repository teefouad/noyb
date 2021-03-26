"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/**
 * Returns type of a given object.
 * @param   {Any}       obj           Object to inspect for type.
 * @return  {String}                  Type of the given object.
 */
var getType = function getType(obj) {
  var typeString = Object.prototype.toString.call(obj);
  return typeString.toLowerCase().replace(/\[object\s|\]/g, '');
};

var _default = getType;
exports["default"] = _default;