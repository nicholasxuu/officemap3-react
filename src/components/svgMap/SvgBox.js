/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import ReactResizeDetector from 'react-resize-detector';
import TouchUtils from '../../utils/TouchUtils';
import DOMUtils from '../../utils/DOMUtils';
import '../../styles/svgMap/svgBox.css';

export const SVG_BODY = 'svg_body';
export const SVG_TRANSFORM_LAYER = 'svg_transform_layer';

class SvgBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false, // is dragging
      hovering: false, // is hovering
      panning: false,
      selectPending: false, // is going to select, but no drag between mouseDown and mouseUp
      panX: null, // for pan movement calculation
      panY: null, // for pan movement calculation
      isTouch: false,
      touchType: false,
      imageWidth: 0,
      imageHeight: 0,
    };
  }

  componentDidMount = () => {
    // initialize viewport matrix into state
    this.updateViewportMatrix();
  };

  componentDidUpdate = () => {
    const imageWidth = this.props.imageData.get('width');
    const imageHeight = this.props.imageData.get('height');

    // update viewport matrix if image size changed
    if (imageWidth !== this.state.imageWidth ||
      imageHeight !== this.state.imageHeight
    ) {
      const state = {
        imageWidth,
        imageHeight,
      };
      this.setState(state);

      this.updateViewportMatrix();
    }
  };

  onResize = () => {
    // when map is resized, update viewport Matrix in state
    this.updateViewportMatrix();
  };

  /**
   * Action level handlers
   *
   * onDragStart
   * onDragMove
   * onDragEnd
   * onElementHover
   */

  /**
   * Set dragging state when drag start
   * @param {Event} e
   */
  onDragStart = () => {
    // Update state with above coordinates, and set dragging to true.
    const state = {
      dragging: true,
    };
    this.setState(state);
  };

  /**
   * Update pan when drag move.
   * @param {Event} e
   */
  onDragMove = (e) => {
    if (this.state.dragging === true) {
      this.onElementHoverEnd(e);

      // Get the new coordinates
      let currPointer;
      if (this.state.isTouch === true) {
        currPointer = TouchUtils.getMultiTouchScreenCenter(e);
      } else {
        currPointer = TouchUtils.getCursorScreenPoint(e);
      }

      // Take the delta where we are minus where we came from.
      if (this.state.panX !== null && this.state.panY !== null) {
        const scaleMultiplier = this.getFinalScaleMultiplier();

        const svgDistanceX = (currPointer.x - this.state.panX) / scaleMultiplier;
        const svgDistanceY = (currPointer.y - this.state.panY) / scaleMultiplier;

        // Pan using the deltas
        this.props.actions.svgPan(svgDistanceX, svgDistanceY);
      }

      // Update the state
      this.setState({
        panning: true,
        panX: currPointer.x,
        panY: currPointer.y,
      });
    }
  };

  /**
   * Unset state when drag end.
   * @param {Event} e
   */
  onDragEnd = () => {
    if (this.state.dragging === true) {
      this.setState({
        dragging: false,
        panning: false,
        panX: null, // unset value
        panY: null, // unset value
      });

      if (this.state.panning === false &&
        this.state.selectPending === false
      ) {
        this.props.actions.hideDetailWidget();
      }
    }
  };

  /**
   * Show and move hovertip above mouse pointer.
   * @param {Event} e
   */
  onElementHover = (e) => {
    if (this.state.hovering === true) {
      if (e.clientX === 'undefined' || e.clientY === 'undefined') {
        return;
      }

      const mapElementId = e.currentTarget.id;

      const hoverClientX = e.clientX;
      const hoverClientY = e.clientY;
      const clientPos = {
        x: hoverClientX,
        y: hoverClientY,
      };

      this.props.actions.showHoverData(mapElementId, clientPos);
    }
  };

  /**
   * Touch handlers
   * mainly for pinch zoom and prevent fk up when multi-touch pan
   *
   * onTouchStart
   * onTouchMove
   * onTouchEnd
   */

  /**
   *
   * @param {Event} e
   */
  onTouchStart = (e) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const state = {
        touchType: 'pinch',
        touchDistanceSq: TouchUtils.getTouchDistanceSquare(e.touches),
      };
      this.setState(state);
    }

    this.setState({ isTouch: true });

    this.onDragStart(e);
  };

  /**
   *
   * @param {Event} e
   */
  onTouchMove = (e) => {
    e.preventDefault();
    if (this.state.touchType === 'pinch') {
      const newTouchDistanceSq = TouchUtils.getTouchDistanceSquare(e.touches);

      const touchDelta = newTouchDistanceSq - this.state.touchDistanceSq;
      const scaleMultiplier = this.getViewportScaleMultiplier();

      this.props.actions.svgZoom((touchDelta / 30000) * scaleMultiplier);

      const state = {
        touchDistanceSq: newTouchDistanceSq,
      };
      this.setState(state);
    }

    this.onDragMove(e);
  };

  /**
   *
   * @param {Event} e
   */
  onTouchEnd = (e) => {
    this.setState({
      touchType: false,
      isTouch: false,
    });

    this.onDragEnd(e);
  };

  /**
   * Mouse handlers for general map
   * hover, click, drag, wheel zoom
   *
   * onMapClickStart
   * onMapClickMove
   * onMapClickEnd
   * onWheel
   */

  /**
   *
   * @param {Event} e
   */
  onMapClickStart = (e) => {
    e.preventDefault();
    this.onDragStart(e);
  };

  /**
   *
   * @param {Event} e
   */
  onMapClickMove = (e) => {
    e.preventDefault();
    this.onDragMove(e);
  };

  /**
   *
   * @param {Event} e
   */
  onMapClickEnd = (e) => {
    e.preventDefault();
    this.onDragEnd(e);
  };

  /**
   *
   * @param {Event} e
   */
  onWheel = (e) => {
    e.preventDefault();
    this.onElementHoverEnd(e);
    const wheelDeadZone = 2;
    if (e.deltaY < -wheelDeadZone) {
      this.props.actions.svgZoom(0.05);
    } else if (e.deltaY > wheelDeadZone) {
      this.props.actions.svgZoom(-0.05);
    }
  };

  /**
   * First level handler for svg elements
   */
  onElementTouchStart = (e, attributes, callback) => {
    this.onElementClickPrepare(e, attributes, callback);
  };

  onElementTouchMove = (e, attributes, callback) => {
    this.onElementClickCancel(e, attributes, callback);
  };

  onElementTouchEnd = (e, attributes, callback) => {
    this.onElementClickStart(e, attributes, callback);
  };

  onElementMouseDown = (e, attributes, callback) => {
    this.onElementClickPrepare(e, attributes, callback);
  };

  onElementMouseUp = (e, attributes, callback) => {
    this.onElementClickStart(e, attributes, callback);
  };

  onElementMouseMove = (e, attributes, callback) => {
    this.onElementPointerMove(e, attributes, callback);
  };

  onElementHoverStart = (e, attributes, callback) => {
    e.preventDefault();

    // only show hover if, hovertip is enabled, and element not selected already.
    if (this.props.hoverTipEnabled === true &&
      e.currentTarget.id !== this.props.selectedMapElementId
    ) {
      this.setState({ hovering: true });
    }

    DOMUtils.setAttributes(e.currentTarget, attributes);

    if (callback) {
      callback(e);
    }
  };

  onElementHoverEnd = (e, attributes, callback) => {
    e.preventDefault();

    if (this.state.hovering === true) {
      this.props.actions.hideHoverData();
      this.setState({ hovering: false });
    }

    DOMUtils.setAttributes(e.currentTarget, attributes);

    if (callback) {
      callback(e);
    }
  };


  /**
   * Mouse handler for svg elements
   *
   * onElementPointerMove
   * onElementHoverStart
   * onElementHoverEnd
   * onElementClickPrepare
   * onElementClickCancel
   * onElementClickStart
   */

  /**
   * Cancel element click if mouse down. and update hover position.
   * @param {Event} e
   * @param {Object} attributes
   * @param {Function} callback
   */
  onElementPointerMove = (e, attributes, callback) => {
    e.preventDefault();

    this.onElementHover(e);
    this.onElementClickCancel(e);

    DOMUtils.setAttributes(e.currentTarget, attributes);

    if (callback) {
      callback(e);
    }
  };


  /**
   * When mouse down, don't show widget yet, listen for drag action before mouse up
   * @param {Event} e
   * @param {Object} attributes
   * @param {Function} callback
   */
  onElementClickPrepare = (e, attributes, callback) => {
    e.preventDefault();

    if (this.state.selectPending === false) {
      this.setState({
        selectPending: true,
      });
    }

    DOMUtils.setAttributes(e.currentTarget, attributes);

    if (callback) {
      callback(e);
    }
  };

  /**
   * If there's any drag action between mouse down and mouse up,
   *     when preparing to trigger widget, disable widget trigger.
   * @param {Event} e
   * @param {Object} attributes
   * @param {Function} callback
   */
  onElementClickCancel = (e, attributes, callback) => {
    e.preventDefault();
    if (this.state.selectPending === true) {
      this.setState({
        selectPending: false,
      });
    }

    DOMUtils.setAttributes(e.currentTarget, attributes);

    if (callback) {
      callback(e);
    }
  };

  /**
   * Trigger widget if good.
   * @param {Event} e
   * @param {Object} attributes
   * @param {Function} callback
   */
  onElementClickStart = (e, attributes, callback) => {
    e.preventDefault();
    if (this.state.selectPending === true) {
      this.setState({
        selectPending: false,
      });
      this.props.actions.goToLocation(e.currentTarget.id, false);
    }

    DOMUtils.setAttributes(e.currentTarget, attributes);

    if (callback) {
      callback(e);
    }
  };

  /**
   * @param {Event} e
   * @param {Object} attributes
   * @param {Function} callback
   */
  onElementMouseOver = (e, attributes, callback = null) => {
    DOMUtils.setAttributes(e.currentTarget, attributes);

    if (callback) {
      callback(e);
    }
  };

  /**
   * Get matrix for svg element vs viewport
   * @returns {SVGMatrix}
   */
  // eslint-disable-next-line arrow-body-style
  getFinalMatrix = () => {
    return this.refs[SVG_TRANSFORM_LAYER].getCTM();
  };

  getFinalScaleMultiplier = () => {
    return this.getFinalMatrix().a; // svg box's scale comparing to current viewport size
  };

  /**
   * Get matrix for svg vs viewport.
   * @return {SVGMatrix}
   */
  getViewportMatrix = () => {
    return this.refs[SVG_BODY].getCTM();
  };

  getViewportScaleMultiplier = () => {
    return this.getViewportMatrix().a; // svg box's scale comparing to current viewport size
  };

  updateViewportMatrix = () => {
    this.props.actions.setViewportMatrix(this.getViewportMatrix());
  };

  /**
   * Render! mf
   */
  render = () => {
    const imageWidth = this.props.imageData.get('width');
    const imageHeight = this.props.imageData.get('height');

    const viewBox = [0, 0, imageWidth, imageHeight].join(' ');
    const highPerformanceMode = this.props.settings.get('highPerformanceMode');

    // todo: remove use of deprecated refs.
    return (
      <div
        className="svg-box svg-non-element"
        ref="svg_container"
        style={{
          touchAction: 'none',
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: '0',
        }}
      >
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          className="svg-non-element"

          version="1.1"
          ref={SVG_BODY}
          style={{
            width: '100%',
            height: '100%',
          }}

          onMouseDown={this.onMapClickStart}
          onMouseMove={this.onMapClickMove}
          onMouseUp={this.onMapClickEnd}
          onWheel={this.onWheel}

          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}

        >

          <g
            id={SVG_TRANSFORM_LAYER}
            ref={SVG_TRANSFORM_LAYER}
            transform={`matrix(${this.props.transformMatrix.join(' ')})`}
          >

            <image
              xlinkHref={this.props.imageData.get('url')}
              x="0"
              y="0"
              height={imageWidth}
              width={imageHeight}
            />

            {this.props.imageData.get('elements').map((element) => {
              const opacity = element.get('opacity');
              if (highPerformanceMode === true &&
                this.state.panning === true &&
                (opacity === '0' || opacity === 0)
              ) {
                // render a dummy so onTouchMove doesn't fail.
                // Even dummy perform significantly better
                return <rect key={element.get('id')} />;
              }

              const CurrentComponent = element.get('data-component-name');

              const elementObj = element.toJS(); // for spreading svg element properties

              return (<CurrentComponent
                key={elementObj.id}
                ref={elementObj.id}
                {...elementObj}

                onMouseEnter={e => this.onElementHoverStart(e, elementObj['data-onmouseenter'])}
                onMouseMove={e => this.onElementMouseMove(e, elementObj['data-onmousemove'])}
                onMouseLeave={e => this.onElementHoverEnd(e, elementObj['data-onmouseleave'])}
                onMouseOver={e => this.onElementMouseOver(e, elementObj['data-onmouseover'])}

                onMouseDown={e => this.onElementMouseDown(e, elementObj['data-onmousedown'])}
                onMouseUp={e => this.onElementMouseUp(e, elementObj['data-onmouseup'])}

                onTouchStart={e => this.onElementTouchStart(e, elementObj['data-ontouchstart'])}
                onTouchMove={e => this.onElementTouchMove(e, elementObj['data-ontouchmove'])}
                onTouchEnd={e => this.onElementTouchEnd(e, elementObj['data-ontouchend'])}
              />);
            })}

          </g>

          { /* <!-- viewport transform --> */ }

          <g transform="translate(150, 90)">
            <g transform="matrix(0.707 0.409 -0.707 0.409 0 -0.816)">
              <g transform="translate(-150, -80)">
              </g>
            </g>
          </g>
        </svg>

      </div>
    );
  }
}

SvgBox.defaultProps = {
  imageData: Immutable.fromJS({
    width: 0,
    height: 0,
    url: '',
    elements: [],
  }),
  transformMatrix: [1, 0, 0, 1, 0, 0],
  hoverTipEnabled: true,
};

SvgBox.propTypes = {
  actions: PropTypes.shape({
    showHoverData: PropTypes.func.isRequired,
    hideHoverData: PropTypes.func.isRequired,
    svgPan: PropTypes.func.isRequired,
    svgZoom: PropTypes.func.isRequired,
    centerAtPoint: PropTypes.func.isRequired,
    goToLocation: PropTypes.func.isRequired,
    setViewportMatrix: PropTypes.func.isRequired,
    hideDetailWidget: PropTypes.func.isRequired,
  }).isRequired,
  imageData: ImmutablePropTypes.contains({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    elements: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      'data-component-name': PropTypes.string.isRequired,
    })),
  }),
  transformMatrix: PropTypes.arrayOf(PropTypes.number),
  hoverTipEnabled: PropTypes.bool,
  selectedMapElementId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  settings: PropTypes.object.isRequired,
};

export default SvgBox;

