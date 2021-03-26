import getType from './get-type';

/**
 * Deeply compares two objects and returns a boolean that specifies whether the two
 * objects are equal
 * @param   {Object | Array} objA First object.
 * @param   {Object | Array} objB Second object.
 * @return  {Boolean}             Result is true if the two objects are equal.
 */
const deepCompare = (objA, objB) => {
  const typeA = getType(objA);
  const typeB = getType(objB);

  if (typeA !== typeB) return false;

  if (typeA === 'object' || typeA === 'array') {
    const keys = Object.keys(objA);

    for (let i = 0; i < keys.length; i += 1) {
      const valueA = objA[keys[i]];
      const valueB = objB[keys[i]];

      if (!deepCompare(valueA, valueB)) {
        return false;
      }
    }
  }

  return objA?.toString() === objB?.toString();
};

export default deepCompare;
