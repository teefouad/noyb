import getType from './get-type';
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

export default deepCopy;