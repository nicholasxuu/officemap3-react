import React from 'react';
import { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import ReactResizeDetector from 'react-resize-detector';
import { getTouchDistanceSquare, getMultiTouchScreenCenter, getCursorScreenPoint } from '../../utils/touchUtils';
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
		};
	}

	componentDidMount = () => {
		// initialize viewport matrix into state
		this.props.actions.setViewportMatrix(this.getViewportMatrix());
	};

	_onResize = () => {
		// when map is resized, update viewport Matrix in state
		this.props.actions.setViewportMatrix(this.getViewportMatrix());
	};

	/**
	 * Get matrix for svg element vs viewport
	 * @returns {SVGMatrix}
	 */
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
	onDragStart = (e) => {
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
			// Get the new coordinates
			let currPointer;
			if (this.state.isTouch === true) {
				currPointer = getMultiTouchScreenCenter(e);
			} else {
				currPointer = getCursorScreenPoint(e);
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
	onDragEnd = (e) => {
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
			e.preventDefault();

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
		if (e.targetTouches.length === 2) {
			const state = {
				touchType: 'pinch',
				touchDistanceSq: getTouchDistanceSquare(e.targetTouches),
			};
			this.setState(state);
		}

		this.setState({isTouch: true});

		this.onDragStart(e);
	};

	/**
	 *
	 * @param {Event} e
	 */
	onTouchMove = (e) => {
		if (this.state.touchType === 'pinch') {
			e.preventDefault();
			const newTouchDistanceSq = getTouchDistanceSquare(e.targetTouches);

			const touchDelta = newTouchDistanceSq - this.state.touchDistanceSq;
			this.props.actions.svgZoom(touchDelta / 50000);

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
		this.onDragStart(e);
	};

	/**
	 *
	 * @param {Event} e
	 */
	onMapClickMove = (e) => {
		this.onDragMove(e);
	};

	/**
	 *
	 * @param {Event} e
	 */
	onMapClickEnd = (e) => {
		this.onDragEnd(e);
	};

	/**
	 *
	 * @param {Event} e
	 */
	onWheel = (e) => {
		e.preventDefault();
		const wheelDeadZone = 2;
		if (e.deltaY < -wheelDeadZone) {
			this.props.actions.svgZoom(0.05);
		} else if (e.deltaY > wheelDeadZone) {
			this.props.actions.svgZoom(-0.05);
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
	 * @param {Function} callback
	 */
	onElementPointerMove = (e, callback) => {
		this.onElementHover(e);
		this.onElementClickCancel(e);

		if (callback) {
			callback(e);
		}
	};

	/**
	 * Check if we want to show hover tip, if so, setup state so it will show when mouse moves.
	 * @param {Event} e
	 * @param {Function} callback
	 */
	onElementHoverStart = (e, callback) => {
		// only show hover if, hovertip is enabled, and element not selected already.
		if (this.props.hoverTipEnabled === true &&
			e.currentTarget.id !== this.props.selectedMapElementId
		) {
			this.setState({ hovering: true });
		}

		if (callback) {
			callback(e);
		}
	};

	/**
	 * Stop hovering
	 * @param {Event} e
	 * @param {Function} callback
	 */
	onElementHoverEnd = (e, callback) => {
		if (this.state.hovering === true) {
			this.props.actions.hideHoverData();
			this.setState({ hovering: false });
		}

		if (callback) {
			callback(e);
		}
	};

	/**
	 * When mouse down, don't show widget yet, listen for drag action before mouse up
	 * @param {Event} e
	 * @param {Function} callback
	 */
	onElementClickPrepare = (e, callback) => {
		if (this.state.selectPending === false) {
			this.setState({ selectPending: true });
		}

		if (callback) {
			callback(e);
		}
	};

	/**
	 * If there's any drag action between mouse down and mouse up,
	 *     when preparing to trigger widget, disable widget trigger.
	 * @param {Event} e
	 * @param {Function} callback
	 */
	onElementClickCancel = (e, callback) => {
		if (this.state.selectPending === true) {
			this.setState({ selectPending: false });
		}

		if (callback) {
			callback(e);
		}
	};

	/**
	 * Trigger widget if good.
	 * @param {Event} e
	 * @param {Function} callback
	 */
	onElementClickStart = (e, callback) => {
		if (this.state.selectPending === true) {
			this.setState({ selectPending: false });
			this.props.actions.goToLocation(e.currentTarget.id, false);
		}

		if (callback) {
			callback(e);
		}
	};

	/**
	 * @param {Event} e
	 * @param {Function} callback
	 */
	onElementMouseOver = (e, callback) => {
		if (callback) {
			callback(e);
		}
	};

	/**
	 * Render! mf
	 */
	render = () => {
		const imageWidth = this.props.imageData.get('width');
		const imageHeight = this.props.imageData.get('height');
		const viewBox = [0, 0, imageWidth, imageHeight].join(' ');
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
				<ReactResizeDetector handleWidth handleHeight onResize={this._onResize.bind(this)} />
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

						{this.props.imageData.get('elements').map(element => {
							const CurrentComponent = element.get('data-component-name');

							const elementObj = element.toJS(); // for spreading svg element properties

							return (<CurrentComponent
								key={element.get('id')}
								ref={element.get('id')}
								{...elementObj}

								onMouseEnter={(e) => this.onElementHoverStart(e, elementObj['data-onmouseenter'])}
								onMouseMove={(e) => this.onElementPointerMove(e, elementObj['data-onmousemove'])}
								onMouseLeave={(e) => this.onElementHoverEnd(e, elementObj['data-onmouseleave'])}
								onMouseOver={(e) => this.onElementMouseOver(e, elementObj['data-onmouseover'])}

								onMouseDown={(e) => this.onElementClickPrepare(e, elementObj['data-onmousedown'])}
								onMouseUp={(e) => this.onElementClickStart(e, elementObj['data-onmouseup'])}

								onTouchStart={(e) => this.onElementClickPrepare(e, elementObj['data-ontouchstart'])}
								onTouchMove={(e) => this.onElementClickCancel(e, elementObj['data-ontouchmove'])}
								onTouchEnd={(e) => this.onElementClickStart(e, elementObj['data-ontouchend'])}
							/>);
						})}

					</g>

					{/*<!-- viewport transform -->*/}

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
	imageData: [
		{
			width: 0,
			height: 0,
			url: '',
			elements: [],
		},
	],
	transformMatrix: [1, 0, 0, 1, 0, 0],
	hoverTipEnabled: true,
};

SvgBox.propTypes = {
	imageData: ImmutablePropTypes.contains({
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		url: PropTypes.string.isRequired,
		elements: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
			id: PropTypes.string.isRequired,
			'data-component-name': PropTypes.string.isRequired,
		}))
	}).isRequired,
	transformMatrix: PropTypes.arrayOf(PropTypes.number).isRequired,
	hoverTipEnabled: PropTypes.bool,
};

export default SvgBox;

