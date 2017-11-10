import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import '../../styles/widgets/mapHoverTip.css';

class SvgMapItem extends React.Component {
  constructor(props) {
    super(props);

    this.rawElement = this.props.element.toJS();
  }

  // eslint-disable-next-line arrow-body-style
  shouldComponentUpdate = (nextProps) => {
    return nextProps.element !== this.props.element;
  };

  componentDidUpdate = (nextProps) => {
    this.rawElement = nextProps.element.toJS();
    console.log('updated');
  };

  onElementHoverStart = (e) => {
    this.props.onElementHoverStart(e, this.rawElement['data-onmouseenter']);
  };

  onElementMouseMove = (e) => {
    this.props.onElementMouseMove(e, this.rawElement['data-onmousemove']);
  };

  onElementHoverEnd = (e) => {
    this.props.onElementHoverEnd(e, this.rawElement['data-onmouseleave']);
  };

  onElementMouseOver = (e) => {
    this.props.onElementMouseOver(e, this.rawElement['data-onmouseover']);
  };

  onElementMouseDown = (e) => {
    this.props.onElementMouseDown(e, this.rawElement['data-onmousedown']);
  };

  onElementMouseUp = (e) => {
    this.props.onElementMouseUp(e, this.rawElement['data-onmouseup']);
  };

  onElementTouchStart = (e) => {
    this.props.onElementTouchStart(e, this.rawElement['data-ontouchstart']);
  };

  onElementTouchMove = (e) => {
    this.props.onElementTouchMove(e, this.rawElement['data-ontouchmove']);
  };

  onElementTouchEnd = (e) => {
    this.props.onElementTouchEnd(e, this.rawElement['data-ontouchend']);
  };

  render = () => {
    const CurrentComponent = this.rawElement['data-component-name'];

    return (<CurrentComponent
      key={this.rawElement.id}

      {...this.rawElement}

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

