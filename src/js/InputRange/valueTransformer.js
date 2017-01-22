import { clamp, isEmpty, isNumber, objectOf } from '../utils';

/**
 * Convert position into percentage value
 * @param {InputRange} inputRange
 * @param {Point} position
 * @return {number} Percentage value
 */
export function percentageFromPosition(inputRange, position) {
  const length = inputRange.trackClientRect.width;
  const sizePerc = position.x / length;

  return sizePerc || 0;
}

/**
 * Convert position into model value
 * @param {InputRange} inputRange
 * @param {Point} position
 * @return {number} Model value
 */
export function valueFromPosition(inputRange, position) {
  const sizePerc = percentageFromPosition(inputRange, position);
  const valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  const value = inputRange.props.minValue + (valueDiff * sizePerc);

  return value;
}

/**
 * Extract values from props
 * @param {InputRange} inputRange
 * @param {Point} [props=inputRange.props]
 * @return {Range} Range values
 */
export function valuesFromProps(inputRange, { props } = inputRange) {
  if (inputRange.isMultiValue) {
    let values = props.value;

    if (isEmpty(values) || !objectOf(values, isNumber)) {
      values = props.defaultValue;
    }

    return Object.create(values);
  }

  const value = isNumber(props.value) ? props.value : props.defaultValue;

  return {
    min: props.minValue,
    max: value,
  };
}

/**
 * Convert value into percentage value
 * @param {InputRange} inputRange
 * @param {number} value
 * @return {number} Percentage value
 */
export function percentageFromValue(inputRange, value) {
  const validValue = clamp(value, inputRange.props.minValue, inputRange.props.maxValue);
  const valueDiff = inputRange.props.maxValue - inputRange.props.minValue;
  const valuePerc = (validValue - inputRange.props.minValue) / valueDiff;

  return valuePerc || 0;
}

/**
 * Convert values into percentage values
 * @param {InputRange} inputRange
 * @param {Range} values
 * @return {Range} Percentage values
 */
export function percentagesFromValues(inputRange, values) {
  const percentages = {
    min: percentageFromValue(inputRange, values.min),
    max: percentageFromValue(inputRange, values.max),
  };

  return percentages;
}

/**
 * Convert value into position
 * @param {InputRange} inputRange
 * @param {number} value
 * @return {Point} Position
 */
export function positionFromValue(inputRange, value) {
  const length = inputRange.trackClientRect.width;
  const valuePerc = percentageFromValue(inputRange, value);
  const positionValue = valuePerc * length;

  return {
    x: positionValue,
    y: 0,
  };
}

/**
 * Convert a range of values into positions
 * @param {InputRange} inputRange
 * @param {Range} values
 * @return {Object<string, Point>}
 */
export function positionsFromValues(inputRange, values) {
  const positions = {
    min: positionFromValue(inputRange, values.min),
    max: positionFromValue(inputRange, values.max),
  };

  return positions;
}

/**
 * Extract a position from an event
 * @param {InputRange} inputRange
 * @param {Event} event
 * @return {Point}
 */
export function positionFromEvent(inputRange, event) {
  const trackClientRect = inputRange.trackClientRect;
  const length = trackClientRect.width;
  const { clientX } = event.touches ? event.touches[0] : event;
  const position = {
    x: clamp(clientX - trackClientRect.left, 0, length),
    y: 0,
  };

  return position;
}

/**
 * Convert a value into a step value
 * @param {InputRange} inputRange
 * @param {number} value
 * @return {number} Step value
 */
export function stepValueFromValue(inputRange, value) {
  return Math.round(value / inputRange.props.step) * inputRange.props.step;
}
