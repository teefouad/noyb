(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['Object Helpers'] = {}));
}(this, (function (exports) { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  /**
   * Returns type of a given object.
   * @param   {Any}       obj           Object to inspect for type.
   * @return  {String}                  Type of the given object.
   */
  var getType = function getType(obj) {
    var typeString = Object.prototype.toString.call(obj);
    return typeString.toLowerCase().replace(/\[object\s|\]/g, '');
  };

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

  /**
   * Deeply compares two objects and returns a boolean that specifies whether the two
   * objects are equal
   * @param   {Object | Array} objA       First object.
   * @param   {Object | Array} objB       Second object.
   * @param   {Function}       comparator A custom function to compare values.
   * @return  {Boolean}             Result is true if the two objects are equal.
   */

  var deepCompare = function deepCompare(objA, objB, comparator) {
    var typeA = getType(objA);
    var typeB = getType(objB);
    if (typeA !== typeB) return false;

    if (typeA === 'object' || typeA === 'array') {
      var keys = Object.keys(objA);

      for (var i = 0; i < keys.length; i += 1) {
        var valueA = objA[keys[i]];
        var valueB = objB[keys[i]];

        if (!(comparator != null ? comparator : deepCompare)(valueA, valueB)) {
          return false;
        }
      }
    }

    return (objA == null ? void 0 : objA.toString()) === (objB == null ? void 0 : objB.toString());
  };

  /**
   * Deep-copies an object or an array.
   * @param   {Object|Array}  obj       Object or Array to copy.
   * @return  {Object|Array}            Copied Object or Array.
   */

  var deepCopy = function deepCopy(obj) {
    var type = getType(obj);

    if (type === 'object' || type === 'array') {
      var newObj = type === 'array' ? [] : {};
      Object.keys(obj).forEach(function (key) {
        if (['object', 'array'].includes(getType(obj[key]))) {
          newObj[key] = deepCopy(obj[key]);
        } else {
          newObj[key] = obj[key];
        }
      });
      return newObj;
    }

    return obj;
  };

  /**
   * Uses a string path to search for a direct property in an object and return its value or
   * replace it if a new value is provided.
   * @param   {Object}    obj           Object to search.
   * @param   {String}    prop          String that represents the property name.
   * @param   {Boolean}   byRef         Whether or not to return the value by reference.
   * @param   {Any}       value         New value to replace the property with. Omit this
   *                                    parameter if you just want to read the property. If the
   *                                    provided value is `undefined`, the property will be deleted.
   * @return  {Object}                  Value of the property or a copy of the same object updated
   *                                    with the provided value.
   */

  var findDirectPropInObject = function findDirectPropInObject(obj, prop, byRef) {
    if (byRef === void 0) {
      byRef = false;
    }

    var type = getType(obj);
    var shouldReplace = (arguments.length <= 3 ? 0 : arguments.length - 3) > 0;
    var value = arguments.length <= 3 ? undefined : arguments[3]; // cannot work with types other than arrays and objects

    if (type !== 'array' && type !== 'object') {
      return obj;
    } // start with a reference to the given object


    var result = obj; // de-reference, if that is required

    if (!byRef) {
      if (type === 'array') {
        result = [].concat(obj);
      }

      if (type === 'object') {
        result = _extends({}, obj);
      }
    } // handle an empty prop name


    if (prop === '') {
      if (shouldReplace) {
        // trying to write to an empty path on an object or an array would
        // result in the same given object or array
        return result;
      } // trying to read an empty path results in 'undefined' value


      return undefined;
    } // handle a wildcard


    if (prop === '*') {
      if (shouldReplace) {
        if (type === 'array') {
          if (value === undefined) {
            while (result.length) {
              findDirectPropInObject(result, 0, true, value);
            }
          } else {
            var _result = result,
                length = _result.length; // traverse the array end-to-start to make sure splicing
            // items does not affect the current index

            result.forEach(function (item, index) {
              var itemIndex = length - 1 - index;
              var itemValue = value;

              if (getType(value) === 'function') {
                itemValue = value(result[itemIndex]);
              }

              if (itemValue === undefined) {
                findDirectPropInObject(result, itemIndex, true, undefined);
              } else {
                var newResult = findDirectPropInObject(result, itemIndex, byRef, itemValue);
                result[itemIndex] = newResult[itemIndex];
              }
            });
          }
        } else if (type === 'object') {
          Object.keys(result).forEach(function (key) {
            return findDirectPropInObject(result, key, true, value);
          });
        }

        return result;
      } // reading a wildcard on an array would return the values
      // of the given array


      if (type === 'array') {
        return result;
      } // reading a wildcard on an object would return the values
      // of the given object


      if (type === 'object') {
        return Object.values(result);
      }
    } // handle other values


    if (shouldReplace) {
      var replaceWith = value;

      if (getType(replaceWith) === 'function') {
        replaceWith = replaceWith(result[prop]);
      } // update the value then return the resulting object


      if (replaceWith === undefined && type === 'array') {
        result.splice(prop, 1);
      } else if (replaceWith === undefined && type === 'object') {
        delete result[prop];
      } else {
        result[prop] = replaceWith;
      }

      return result;
    } // return the value of the prop


    return result[prop];
  };
  /**
   * Uses a string path to search for a property in an object and return its value or
   * replace it if a new value is provided.
   * @param   {Object}    obj           Object to search.
   * @param   {String}    pathStr       String that represents the property path.
   *                                    For example: data.entries[0][3].title
   * @param   {Boolean}   byRef         Whether or not to return the value by reference.
   * @param   {Any}       value         New value to replace the property with. Omit this
   *                                    parameter if you just want to read the property.
   * @return  {Object}                  Value of the property or a copy of the same object updated
   *                                    with the provided value.
   */

  var findPropInObject = function findPropInObject(obj, pathStr, byRef) {
    if (byRef === void 0) {
      byRef = false;
    }

    var type = getType(obj);
    var shouldReplace = (arguments.length <= 3 ? 0 : arguments.length - 3) > 0;
    var value = arguments.length <= 3 ? undefined : arguments[3]; // clean and convert the path string into an array

    var path = pathStr.toString().replace(/^\[|\]$/g, ''); // remove starting and ending brackets

    path = path.replace(/\[|\]/g, '.'); // convert all brackets to dots

    path = path.replace(/\.{2,}/g, '.'); // remove dot duplications

    path = path.split('.'); // break the string at the dots

    if (path.length === 1) {
      if (shouldReplace) {
        return findDirectPropInObject(obj, path[0], byRef, value);
      }

      return findDirectPropInObject(obj, path[0], byRef);
    } // start with a reference to the given object


    var result = obj; // de-reference, if that is required

    if (!byRef) {
      if (type === 'array') {
        result = [].concat(obj);
      }

      if (type === 'object') {
        result = _extends({}, obj);
      }
    }

    var prop = path[0];
    var remainingPath = path.slice(1).join('.');

    if (shouldReplace) {
      // if the current path component is a wildcard, each item would have
      // to be mapped with value returned from the remaining path
      if (prop === '*') {
        if (type === 'array') {
          result.forEach(function (item, index) {
            result[index] = findPropInObject(item, remainingPath, byRef, value);
          });
        }

        if (type === 'object') {
          Object.keys(result).forEach(function (key) {
            result[key] = findPropInObject(result[key], remainingPath, byRef, value);
          });
        }

        return result;
      }

      if (typeof result[prop] === 'undefined') {
        result[prop] = {};
      }

      result[prop] = findPropInObject(result[prop], remainingPath, byRef, value);
      return result;
    } // if the current path component is a wildcard, each item would have
    // to be mapped with value returned from the remaining path


    if (prop === '*') {
      if (type === 'array') {
        return result.map(function (item) {
          return findPropInObject(item, remainingPath, byRef);
        });
      }

      if (type === 'object') {
        return Object.values(result).map(function (item) {
          return findPropInObject(item, remainingPath, byRef);
        });
      }
    } // the `|| {}` part handles undefined values, it will return `undefined` instead
    // of throwing an error


    return findPropInObject(result[prop] || {}, remainingPath, byRef);
  };
  /**
   * Queries an object for a specific value using a string path.
   * @param   {String}    query         String that represents the property path.
   *                                    For example: data.entries[0][3].title
   * @param   {Object}    object        Object to query.
   * @param   {Any}       value         New value to replace the property with. Omit this
   *                                    parameter if you just want to read the property.
   * @return  {Object}                  The object, part of it or a value in the object.
   */

  var queryObject = function queryObject(query, obj) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    // handle query strings
    if (getType(query) === 'string') {
      return findPropInObject.apply(void 0, [obj, query, false].concat(args));
    } // handle query objects


    if (getType(query) === 'object') {
      return Object.keys(query).reduce(function (prev, next) {
        var _extends2;

        return _extends({}, prev, (_extends2 = {}, _extends2[next] = findPropInObject.apply(void 0, [obj, query[next], false].concat(args)), _extends2));
      }, {});
    }

    return obj;
  };

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

  exports.applyDefaults = applyDefaults;
  exports.deepCompare = deepCompare;
  exports.deepCopy = deepCopy;
  exports.getType = getType;
  exports.mergeObjects = mergeObjects;
  exports.queryObject = queryObject;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
