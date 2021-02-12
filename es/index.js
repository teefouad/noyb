import _extends from "@babel/runtime/helpers/esm/extends";

/**
 * Returns type of a given object.
 * @param   {Any}       obj           Object to inspect for type.
 * @return  {String}                  Type of the given object.
 */
export var getObjectType = function getObjectType(obj) {
  var typeString = Object.prototype.toString.call(obj);
  return typeString.toLowerCase().replace(/\[object\s|\]/g, '');
};
/**
 * Uses a string path to search for a direct property in an object and return its value or
 * replace it if a new value is provided.
 * @param   {Object}    obj           Object to search.
 * @param   {String}    prop          String that represents the property name.
 * @param   {Any}       value         New value to replace the property with. Omit this
 *                                    parameter if you just want to read the property. If the
 *                                    provided value is `undefined`, the property will be deleted.
 * @return  {Object}                  Value of the property or a copy of the same object updated
 *                                    with the provided value.
 */

export var findDirectPropInObject = function findDirectPropInObject(obj, prop, copyByRef) {
  if (copyByRef === void 0) {
    copyByRef = false;
  }

  var type = getObjectType(obj);
  var shouldReplace = (arguments.length <= 3 ? 0 : arguments.length - 3) > 0;
  var value = arguments.length <= 3 ? undefined : arguments[3]; // cannot work with types other than arrays and objects

  if (type !== 'array' && type !== 'object') {
    return obj;
  } // start with a reference to the given object


  var result = obj; // de-reference, if that is required

  if (!copyByRef) {
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

            if (getObjectType(value) === 'function') {
              itemValue = value(result[itemIndex]);
            }

            if (itemValue === undefined) {
              findDirectPropInObject(result, itemIndex, true, undefined);
            } else {
              var newResult = findDirectPropInObject(result, itemIndex, copyByRef, itemValue);
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

    if (getObjectType(replaceWith) === 'function') {
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
 * @param   {Any}       value         New value to replace the property with. Omit this
 *                                    parameter if you just want to read the property.
 * @return  {Object}                  Value of the property or a copy of the same object updated
 *                                    with the provided value.
 */

export var findPropInObject = function findPropInObject(obj, pathStr, copyByRef) {
  if (copyByRef === void 0) {
    copyByRef = false;
  }

  var type = getObjectType(obj);
  var shouldReplace = (arguments.length <= 3 ? 0 : arguments.length - 3) > 0;
  var value = arguments.length <= 3 ? undefined : arguments[3]; // clean and convert the path string into an array

  var path = pathStr.toString().replace(/^\[|\]$/g, ''); // remove starting and ending brackets

  path = path.replace(/\[|\]/g, '.'); // convert all brackets to dots

  path = path.replace(/\.{2,}/g, '.'); // remove dot duplications

  path = path.split('.'); // break the string at the dots

  if (path.length === 1) {
    if (shouldReplace) {
      return findDirectPropInObject(obj, path[0], copyByRef, value);
    }

    return findDirectPropInObject(obj, path[0], copyByRef);
  } // start with a reference to the given object


  var result = obj; // de-reference, if that is required

  if (!copyByRef) {
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
          result[index] = findPropInObject(item, remainingPath, copyByRef, value);
        });
      }

      if (type === 'object') {
        Object.keys(result).forEach(function (key) {
          result[key] = findPropInObject(result[key], remainingPath, copyByRef, value);
        });
      }

      return result;
    }

    if (typeof result[prop] === 'undefined') {
      result[prop] = {};
    }

    result[prop] = findPropInObject(result[prop], remainingPath, copyByRef, value);
    return result;
  } // if the current path component is a wildcard, each item would have
  // to be mapped with value returned from the remaining path


  if (prop === '*') {
    if (type === 'array') {
      return result.map(function (item) {
        return findPropInObject(item, remainingPath, copyByRef);
      });
    }

    if (type === 'object') {
      return Object.values(result).map(function (item) {
        return findPropInObject(item, remainingPath, copyByRef);
      });
    }
  } // the `|| {}` part handles undefined values, it will return `undefined` instead
  // of throwing an error


  return findPropInObject(result[prop] || {}, remainingPath, copyByRef);
};
/**
 * Queries an object for a specific value.
 * @param   {String}    query   Query string.
 * @param   {Object}    object  Object to query.
 * @return  {Object}            The object, part of it or a value in the object.
 */

export var queryObject = function queryObject(query, obj) {
  // handle query strings
  if (getObjectType(query) === 'string') {
    return findPropInObject(obj, query);
  } // handle query objects


  if (getObjectType(query) === 'object') {
    return Object.keys(query).reduce(function (prev, next) {
      var _extends2;

      return _extends({}, prev, (_extends2 = {}, _extends2[next] = findPropInObject(obj, query[next]), _extends2));
    }, {});
  }

  return obj;
};
/**
 * Updates an object by merging a fragment object into it.
 * @param   {Object} objA Object to update.
 * @param   {Object} objB Fragment object.
 * @return  {Object}      The updated object.
 */

export var mergeObjects = function mergeObjects(objA, objB) {
  return Object.keys(objB).reduce(function (prev, next) {
    return findPropInObject(prev, next, false, objB[next]);
  }, _extends({}, objA));
};
/**
 * Deep-copies an object or an array.
 * @param   {Object|Array}  obj       Object or Array to copy.
 * @return  {Object|Array}            Copied Object or Array.
 */

export var deepCopy = function deepCopy(obj) {
  var type = getObjectType(obj);

  if (type === 'object' || type === 'array') {
    var newObj = type === 'array' ? [] : {};
    Object.keys(obj).forEach(function (key) {
      if (['object', 'array'].includes(getObjectType(obj[key]))) {
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
 * Deeply compares two objects and returns a boolean that specifies whether the two
 * objects are equal
 * @param   {Object | Array} objA First object.
 * @param   {Object | Array} objB Second object.
 * @return  {Boolean}             Result is true if the two objects are equal.
 */

export var deepCompare = function deepCompare(objA, objB) {
  var typeA = getObjectType(objA);
  var typeB = getObjectType(objB);
  if (typeA !== typeB) return false;

  if (typeA === 'object' || typeA === 'array') {
    var keys = Object.keys(objA);

    for (var i = 0; i < keys.length; i += 1) {
      var valueA = objA[keys[i]];
      var valueB = objB[keys[i]];

      if (!deepCompare(valueA, valueB)) {
        return false;
      }
    }
  }

  return (objA == null ? void 0 : objA.toString()) === (objB == null ? void 0 : objB.toString());
};
/**
 * Fills an object with default values
 * @param {*} settings Settings object to be filled
 * @param {*} defaults Default values object
 */

export var applyDefaults = function applyDefaults(settings, defaults) {
  if (settings === void 0) {
    settings = {};
  }

  if (defaults === void 0) {
    defaults = {};
  }

  return Object.keys(defaults).reduce(function (p, n) {
    var _settings$n, _extends3;

    return _extends({}, p, (_extends3 = {}, _extends3[n] = getObjectType(defaults[n]) === 'object' ? applyDefaults(settings[n], defaults[n]) : (_settings$n = settings[n]) != null ? _settings$n : defaults[n], _extends3));
  }, {});
};