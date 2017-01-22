/**
 * @callback predicateFn
 * @param {*} value
 * @return {boolean}
 */

/**
 * Clamp a value between a min and max value
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Extend an Object
 * @param {Object} object - Destination object
 * @param {...Object} sources - Source objects
 * @return {Object} Destination object, extended with members from sources
 */
export function extend(object, ...sources) {
  return Object.assign(object, ...sources);
}

/**
 * Check if a value is included in an array
 * @param {Array} array
 * @param {number} value
 * @return {boolean}
 */
export function includes(array, value) {
  return array.indexOf(value) > -1;
}

/**
 * Return a new object without the specified keys
 * @param {Object} obj
 * @param {string[]} omitKeys
 * @return {Object}
 */
export function omit(obj, omitKeys) {
  const keys = Object.keys(obj);
  const outputObj = {};

  keys.forEach((key) => {
    if (!includes(omitKeys, key)) {
      outputObj[key] = obj[key];
    }
  });

  return outputObj;
}

/**
 * Captialize a string
 * @param {string} string
 * @return {string}
 */
export function captialize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Calculate the distance between pointA and pointB
 * @param {Point} pointA
 * @param {Point} pointB
 * @return {number} Distance
 */
export function distanceTo(pointA, pointB) {
  const xDiff = (pointB.x - pointA.x) ** 2;
  const yDiff = (pointB.y - pointA.y) ** 2;

  return Math.sqrt(xDiff + yDiff);
}

/**
 * Calculate the absolute difference between two numbers
 * @param {number} numA
 * @param {number} numB
 * @return {number}
 */
export function length(numA, numB) {
  return Math.abs(numA - numB);
}

/**
 * Check if a value is a number
 * @param {*} value
 * @return {Boolean}
 */
export function isNumber(value) {
  return typeof value === 'number';
}

/**
 * Check if a value is an object
 * @param {*} value
 * @return {Boolean}
 */
export function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * Check if a value is defined
 * @param {*} value
 * @return {Boolean}
 */
export function isDefined(value) {
  return value !== undefined && value !== null;
}

/**
 * Check if an object is empty
 * @param {Object|Array} obj
 * @return {Boolean}
 */
export function isEmpty(obj) {
  if (!obj) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  return Object.keys(obj).length === 0;
}

/**
 * Check if all items in an array match a predicate
 * @param {Array} array
 * @param {predicateFn} predicate
 * @return {Boolean}
 */
export function arrayOf(array, predicate) {
  if (!Array.isArray(array)) {
    return false;
  }

  for (let i = 0, len = array.length; i < len; i++) {
    if (!predicate(array[i])) {
      return false;
    }
  }

  return true;
}

/**
 * Check if all items in an object match a predicate
 * @param {Object} object
 * @param {predicateFn} predicate
 * @param {string[]} keys
 * @return {Boolean}
 */
export function objectOf(object, predicate, keys) {
  if (!isObject(object)) {
    return false;
  }

  const props = keys || Object.keys(object);

  for (let i = 0, len = props.length; i < len; i++) {
    const prop = props[i];

    if (!predicate(object[prop])) {
      return false;
    }
  }

  return true;
}

/**
 * Bind all methods of an object to itself
 * @param {Function[]} methodNames
 * @param {Object} instance
 */
export function autobind(methodNames, instance) {
  /* eslint-disable no-param-reassign */
  methodNames.forEach((methodName) => {
    instance[methodName] = instance[methodName].bind(instance);
  });
}
