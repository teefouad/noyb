import getType from './get-type';

/**
 * Fills an object with default values
 * @param {Object} obj Object to be filled
 * @param {Object} defaults Default values object
 */
const applyDefaults = (obj = {}, defaults = {}) => Object.keys({
  ...obj,
  ...defaults,
}).reduce(
  (p, n) => {
    let value;

    if (getType(defaults[n]) === 'object') {
      value = applyDefaults(obj[n], defaults[n]);
    } else {
      value = getType(obj[n]) !== 'undefined' ? obj[n] : defaults[n];
    }

    return ({
      ...p,
      [n]: value,
    });
  },
  {},
);

export default applyDefaults;
