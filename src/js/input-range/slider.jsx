import React from 'react';
import Label from './label';
import { autobind } from '../utils';

/**
 * Slider React component
 */
export default class Slider extends React.Component {
  /**
   * Accepted propTypes of Slider
   * @return {Object}
   * @property {Function} ariaLabelledby
   * @property {Function} ariaControls
   * @property {Function} className
   * @property {Function} formatLabel
   * @property {Function} maxValue
   * @property {Function} minValue
   * @property {Function} onSliderKeyDown
   * @property {Function} onSliderMouseMove
   * @property {Function} percentage
   * @property {Function} value
   */
  static get propTypes() {
    return {
      ariaLabelledby: React.PropTypes.string,
      ariaControls: React.PropTypes.string,
      classNames: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
      formatLabel: React.PropTypes.func,
      maxValue: React.PropTypes.number,
      minValue: React.PropTypes.number,
      onSliderKeyDown: React.PropTypes.func.isRequired,
      onSliderMouseMove: React.PropTypes.func.isRequired,
      percentage: React.PropTypes.number.isRequired,
      value: React.PropTypes.number.isRequired,
    };
  }

  /**
   * Slider constructor
   * @param {Object} props - React component props
   */
  constructor(props) {
    super(props);

    // Auto-bind
    autobind([
      'handleClick',
      'handleMouseDown',
      'handleMouseUp',
      'handleMouseMove',
      'handleTouchStart',
      'handleTouchEnd',
      'handleTouchMove',
      'handleKeyDown',
    ], this);
  }

  /**
   * Get the owner document of slider
   * @return {Document} Document
   */
  getDocument() {
    return this.refs.slider.ownerDocument;
  }

  /**
   * Get the style of slider based on its props
   * @return {Object} CSS styles
   */
  getStyle() {
    const perc = (this.props.percentage || 0) * 100;
    const style = {
      position: 'absolute',
      left: `${perc}%`,
    };

    return style;
  }

  /**
   * Handle any click event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleClick(event) { // eslint-disable-line class-methods-use-this
    event.preventDefault();
  }

  /**
   * Handle any mousedown event received by the component
   */
  handleMouseDown() {
    const document = this.getDocument();

    // Event
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mouseup event received by the component
   */
  handleMouseUp() {
    const document = this.getDocument();

    // Event
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  /**
   * Handle any mousemove event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleMouseMove(event) {
    this.props.onSliderMouseMove(event, this);
  }

  /**
   * Handle any touchstart event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchStart(event) {
    const document = this.getDocument();

    event.preventDefault();

    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any touchmove event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleTouchMove(event) {
    this.props.onSliderMouseMove(event, this);
  }

  /**
   * Handle any touchend event received by the component
   */
  handleTouchEnd(event) {
    const document = this.getDocument();

    event.preventDefault();

    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
  }

  /**
   * Handle any keydown event received by the component
   * @param {SyntheticEvent} event - User event
   */
  handleKeyDown(event) {
    this.props.onSliderKeyDown(event, this);
  }

  /**
   * Render method of the component
   * @return {string} Component JSX
   */
  render() {
    const classNames = this.props.classNames;
    const style = this.getStyle();

    return (
      <span
        className={ classNames.sliderContainer }
        ref="slider"
        style={ style }>
        <Label
          className={ classNames.labelValue }
          containerClassName={ classNames.labelContainer }
          formatLabel={ this.props.formatLabel }>
          { this.props.value }
        </Label>

        <a
          aria-labelledby={ this.props.ariaLabelledby }
          aria-controls={ this.props.ariaControls }
          aria-valuemax={ this.props.maxValue }
          aria-valuemin={ this.props.minValue }
          aria-valuenow={ this.props.value }
          className={ classNames.slider }
          draggable="false"
          href="#"
          onClick={ this.handleClick }
          onKeyDown={ this.handleKeyDown }
          onMouseDown={ this.handleMouseDown }
          onTouchStart={ this.handleTouchStart }
          role="slider" />
      </span>
    );
  }
}
