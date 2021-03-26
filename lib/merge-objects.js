"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _queryObject = require("./query-object");

/**
 * Updates an object by merging a fragment object into it.
 * @param   {Object}  objA    Object to update.
 * @param   {Object}  objB    Fragment object.
 * @return  {Object}          The updated object.
 */
var mergeObjects = function mergeObjects(objA, objB) {
  return Object.keys(objB).reduce(function (prev, next) {
    return (0, _queryObject.findPropInObject)(prev, next, false, objB[next]);
  }, (0, _extends2["default"])({}, objA));
};

var _default = mergeObjects;
exports["default"] = _default;