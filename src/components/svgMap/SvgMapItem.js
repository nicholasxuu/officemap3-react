import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import '../../styles/widgets/mapHoverTip.css';

class SvgMapItem extends React.Component {
  

  onElementHoverStart = (e) => {
    this.onElementHoverStart(e, this.props.element.get('data-onmouseenter'));
  };

  onElementMouseMove = (e) => {
    this.onElementMouseMove(e, this.props.element.get('data-onmousemove'));
  };

  onElementHoverEnd = (e) => {
    this.onElementHoverEnd(e, this.props.element.get('data-onmouseleave'));
  };

  onElementMouseOver = (e) => {
    this.onElementMouseOver(e, this.props.element.get('data-onmouseover'));
  };

  onElementMouseDown = (e) => {
    this.onElementMouseDown(e, this.props.element.get('data-onmousedown'));
  };

  onElementMouseUp = (e) => {
    this.onElementMouseUp(e, this.props.element.get('data-onmouseup'));
  };

  onElementTouchStart = (e) => {
    this.onElementTouchStart(e, this.props.element.get('data-ontouchstart'));
  };

  onElementTouchMove = (e) => {
    this.onElementTouchMove(e, this.props.element.get('data-ontouchmove'));
  };

  onElementTouchEnd = (e) => {
    this.onElementTouchEnd(e, this.props.element.get('data-ontouchend'));
  };


  render = () => {
    const CurrentComponent = this.props.element.get('data-component-name');

    const elementObj = this.props.element.toJS(); // for spreading svg element properties

    return (<CurrentComponent
      key={elementObj.id}

      {...elementObj}

      onMouseEnter={this.onElementHoverStart}
      onMouseMove={this.onElementMouseMove}
      onMouseLeave={this.onElementHoverEnd}
      onFocus={this.onElementMouseOver}
      onMouseOver={this.onElementMouseOver}

      onMouseDown={this.onElementMouseDown}
      onMouseUp={this.onElementMouseUp}

      onTouchStart={this.onElementTouchStart}
      onTouchMove={this.onElementTouchMove}
      onTouchEnd={this.onElementTouchEnd}
    />);
  }
}

SvgMapItem.defaultProps = {
};

SvgMapItem.propTypes = {
  element: ImmutablePropTypes.map.isRequired,
  onElementHoverStart: PropTypes.func.isRequired,
  onElementMouseMove: PropTypes.func.isRequired,
  onElementHoverEnd: PropTypes.func.isRequired,
  onElementMouseOver: PropTypes.func.isRequired,
  onElementMouseDown: PropTypes.func.isRequired,
  onElementMouseUp: PropTypes.func.isRequired,
  onElementTouchStart: PropTypes.func.isRequired,
  onElementTouchMove: PropTypes.func.isRequired,
  onElementTouchEnd: PropTypes.func.isRequired,
};

export default SvgMapItem;

