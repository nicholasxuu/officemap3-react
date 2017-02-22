import React from 'react';
import { PropTypes } from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import ReactResizeDetector from 'react-resize-detector';
import { getTouchDistanceSquare, getMultiTouchCenter } from '../../utils/touchUtils';
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
			panX: 0, // for pan movement calculation
			panY: 0, // for pan movement calculation
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

	onDragStart = (e) => {
		// Update state with above coordinates, and set dragging to true.
		const state = {
			dragging: true,
		};
		this.setState(state);
	};

	onDragMove = (e) => {
		if (this.state.dragging === true) {
			// Get the new coordinates
			const touchCenter = getMultiTouchCenter(e);

			// Take the delta where we are minus where we came from.
			if (this.state.panX > 0 && this.state.panY > 0) {
				const scaleMultiplier = this.getFinalScaleMultiplier();

				const svgDistanceX = (touchCenter.x - this.state.panX) / scaleMultiplier;
				const svgDistanceY = (touchCenter.y - this.state.panY) / scaleMultiplier;

				// Pan using the deltas
				this.props.actions.svgPan(svgDistanceX, svgDistanceY);
			}

			// Update the state
			this.setState({
				panning: true,
				panX: touchCenter.x,
				panY: touchCenter.y,
			});
		}
	};

	onDragEnd = (e) => {
		if (this.state.dragging === true) {
			this.setState({
				dragging: false,
				panning: false,
				panX: 0, // unset value
				panY: 0, // unset value
			});

			if (this.state.panning === false &&
				this.state.selectPending === false
			) {
				this.props.actions.hideDetailWidget();
			}
		}
	};

	onTouchStart = (e) => {
		if (e.targetTouches.length === 2) {
			const state = {
				touchType: 'pinch',
				touchDistanceSq: getTouchDistanceSquare(e.targetTouches),
			};
			this.setState(state);
		}

		this.onDragStart(e);
	};

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

	onTouchEnd = (e) => {
		this.setState({touchType: false});

		this.onDragEnd(e);
	};

	onMapClickStart = (e) => {
		this.onDragStart(e);
	};

	onMapClickMove = (e) => {
		this.onDragMove(e);
	};

	onMapClickEnd = (e) => {
		this.onDragEnd(e);
	};

	onWheel = (e) => {
		e.preventDefault();
		const wheelDeadZone = 2;
		if (e.deltaY < -wheelDeadZone) {
			this.props.actions.svgZoom(0.05);
		} else if (e.deltaY > wheelDeadZone) {
			this.props.actions.svgZoom(-0.05);
		}
	};

	onElementPointerMove = (e) => {
		this.onElementHover(e);
		this.onElementClickCancel(e);
	};

	onElementHoverStart = (e) => {
		// only show hover if, hovertip is enabled, and element not selected already.
		if (this.props.hoverTipEnabled === true &&
			e.currentTarget.id !== this.props.selectedMapElementId
		) {
			this.setState({ hovering: true });
		}
	};

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

	onElementHoverEnd = (e) => {
		if (this.state.hovering === true) {
			this.props.actions.hideHoverData();
			this.setState({ hovering: false });
		}
	};

	onElementClickPrepare = (e) => {
		if (this.state.selectPending === false) {
			this.setState({ selectPending: true });
		}
	};

	onElementClickCancel = (e) => {
		if (this.state.selectPending === true) {
			this.setState({ selectPending: false });
		}
	};

	onElementClickStart = (e) => {
		if (this.state.selectPending === true) {
			this.setState({ selectPending: false });
			this.props.actions.goToLocation(e.currentTarget.id, false);
		}
	};

	render = () => {
		const imageWidth = this.props.imageData.get('width');
		const imageHeight = this.props.imageData.get('height');
		const viewBox = [0, 0, imageWidth, imageHeight].join(' ');
		return (
			<div className="svg-box svg-non-element" ref="svg_container">
				<ReactResizeDetector handleWidth handleHeight onResize={this._onResize.bind(this)} />
				<svg
					viewBox={viewBox}
					preserveAspectRatio="xMidYMid meet"
					className="svg-non-element"

					version="1.1"
					ref={SVG_BODY}

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
							const CurrentComponent = element.get('componentName');

							const elementObj = element.toJS(); // for spreading svg element properties
							delete elementObj.componentName; // prevent unknown propType warning

							return (<CurrentComponent
								key={element.get('id')}
								ref={element.get('id')}
								{...elementObj}

								onMouseEnter={this.onElementHoverStart}
								onMouseMove={this.onElementPointerMove}
								onMouseLeave={this.onElementHoverEnd}

								onMouseDown={this.onElementClickPrepare}
								onMouseUp={this.onElementClickStart}

								onTouchStart={this.onElementClickPrepare}
								onTouchMove={this.onElementClickCancel}
								onTouchEnd={this.onElementClickStart}
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
	imageData: {
		width: 0,
		height: 0,
		url: '',
		elements: [],
	},
	transformMatrix: [1, 0, 0, 1, 0, 0],
	hoverTipEnabled: true, // todo: set to true
};

SvgBox.propTypes = {
	imageData: ImmutablePropTypes.contains({
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		url: PropTypes.string.isRequired,
		elements: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
			id: PropTypes.string.isRequired,
			componentName: PropTypes.string.isRequired,
		})),
	}).isRequired,
	transformMatrix: PropTypes.arrayOf(PropTypes.number).isRequired,
	hoverTipEnabled: PropTypes.bool,
};

export default SvgBox;

