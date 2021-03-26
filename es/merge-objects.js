import _extends from "@babel/runtime/helpers/esm/extends";
import { findPropInObject } from './query-object';
/**
 * Updates an object by merging a fragment object into it.
 * @param   {Object}  objA    Object to update.
 * @param   {Object}  objB    Fragment object.
 * @return  {Object}          The updated object.
 */

var mergeObjects = function mergeObjects(objA, objB) {
  return Object.keys(objB).reduce(function (prev, next) {
    return findPropInObject(prev, next, false, objB[next]);
  }, _extends({}, objA));
};

export default mergeObjects;