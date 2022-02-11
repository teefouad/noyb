import getType from './get-type';
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

export default deepCompare;