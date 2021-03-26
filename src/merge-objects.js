import { findPropInObject } from './query-object';

/**
 * Updates an object by merging a fragment object into it.
 * @param   {Object}  objA    Object to update.
 * @param   {Object}  objB    Fragment object.
 * @return  {Object}          The updated object.
 */
const mergeObjects = (objA, objB) => Object.keys(objB).reduce(
  (prev, next) => findPropInObject(prev, next, false, objB[next]),
  { ...objA },
);

export default mergeObjects;
