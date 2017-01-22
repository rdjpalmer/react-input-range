/**
 * Check if a value is an object
 * @param {*} value
 * @return {Boolean}
 */
export default function isObject(value) {
  return value !== null && typeof value === 'object';
}
