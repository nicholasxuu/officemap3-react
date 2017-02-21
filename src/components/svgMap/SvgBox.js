import React from 'react';
import { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/svgBox.css';
import { updateSelectedTip } from './utils/svgUtils';
import { getShapeCenter } from './utils/svgShapeUtils';

class SvgBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dragging: false, // is dragging
			hovering: false, // is hovering
			selectPending: false, // is going to select, but no drag between mouseDown and mouseUp
			panStartX: 0, // for pan movement calculation
			panStartY: 0, // for pan movement calculation
			scaleMultiplier: 1, // current svg scale factor
		};
	}

	getScaleMultiplier = (e) => {
		return e.currentTarget.getCTM().a * this.props.transformMatrix[0]; // svg box's scale comparing to current viewport size
	};

	onDragStart = (e) => {
		// Find start position of drag based on touch/mouse coordinates.
		const panStartX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
		const panStartY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
		const scaleMultiplier = this.getScaleMultiplier(e);

		// Update state with above coordinates, and set dragging to true.
		const state = {
			dragging: true,
			panStartX,
			panStartY,
			scaleMultiplier,
		};

		this.setState(state);
	};

	onDragMove = (e) => {
		if (this.state.dragging === true) {
			e.preventDefault();
			// Get the new x coordinates
			const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
			const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

			// Take the delta where we are minus where we came from.
			const svgDistanceX = (x - this.state.panStartX) / this.state.scaleMultiplier;
			const svgDistanceY = (y - this.state.panStartY) / this.state.scaleMultiplier;

			// Pan using the deltas
			this.props.actions.svgPan(svgDistanceX, svgDistanceY);

			// Update the state
			this.setState({
				panStartX: x,
				panStartY: y,
			});
		}
	};

	onDragEnd = (e) => {
		this.setState({ dragging: false });
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

	onElementHoverStart = (e) => {
		if (this.props.hoverTipEnabled === true) {
			this.setState({ hovering: true });
		}
	};

	onElementHover = (e) => {
		if (this.state.hovering === true) {
			e.preventDefault();
			const mapElementId = e.currentTarget.id;

			const hoverClientX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
			const hoverClientY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
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
		// if (this.state.selectPending === false) {
		// 	this.setState({ selectPending: true });
		// }
	};

	onElementClickCancel = (e) => {
		// if (this.state.selectPending === true) {
		// 	this.setState({ selectPending: false });
		// }
	};

	onElementClickStart = (e) => {
		// if (this.state.selectPending === true) {
		// 	this.onElementHoverEnd(); // clear current hover state if there any.
		//
		// 	this.setState({ selectedLocationId: e.currentTarget.id });
		//
		// 	// note: set state doesn't work immediately, need to use raw object if run immediately.
		// 	updateSelectedTip(e.currentTarget, this.props.locations, this.props.actions.widgetData);
		// }
	};

	panToCenterAtPoint = (cx, cy) => {
		// const m = this.state.matrix;
		//
		// m[4] = this.props.imageData.width / 2 - cx;
		// m[5] = this.props.imageData.height / 2 - cy;
		//
		// this.setState({ matrix: m });
		//
		// this.onTransform();
	};

	centerElement = (elementId) => {
		// this.onElementHoverEnd(); // clear current hover state if there any.
		//
		// this.setState({ selectedLocationId: elementId });
		//
		// let centerPoint = this.getCenterPointById(elementId);
		//
		// this.panToCenterAtPoint(centerPoint.x, centerPoint.y);
	};

	pan = (dx, dy) => {
		// const m = this.state.matrix;
		// m[4] += dx;
		// m[5] += dy;
		// this.setState({ matrix: m });
		//
		// this.onTransform();
	};

	zoom = (scale) => {
		// const m = this.state.matrix;
		// const len = m.length;
		// for (let i = 0; i < len; i++) {
		// 	m[i] *= scale;
		// }
		// m[4] += (1 - scale) * this.props.imageData.width / 2;
		// m[5] += (1 - scale) * this.props.imageData.height / 2;
		// this.setState({ matrix: m });
		//
		// this.onTransform();
	};

	onTransform = () => {
		// const selectedDOM = ReactDOM.findDOMNode(this.refs[this.state.selectedLocationId]);
		// updateSelectedTip(selectedDOM, this.props.locations, this.props.actions.widgetData);
	};

	getCenterPointById = (id) => {
		// const targetRef = this.refs[id];
		// if (!targetRef) {
		// 	return {
		// 		x: 0,
		// 		y: 0,
		// 	}
		// }
		// return getShapeCenter(targetRef);
	};

	render = () => {
		const imageWidth = this.props.imageData.get('width');
		const imageHeight = this.props.imageData.get('height');
		const viewBox = [0, 0, imageWidth, imageHeight].join(' ');
		return (
			<div className="svg-box" ref="svgContainer">
				<svg
					viewBox={viewBox}
					preserveAspectRatio="xMidYMid meet"

					version="1.1"

					onMouseDown={this.onDragStart}
					onTouchStart={this.onDragStart}
					onMouseMove={this.onDragMove}
					onTouchMove={this.onDragMove}
					onMouseUp={this.onDragEnd}
					onTouchEnd={this.onDragEnd}
				    onWheel={this.onWheel}
				>

					<g
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
								onMouseMove={this.onElementHover}
								onMouseLeave={this.onElementHoverEnd}

								onMouseDown={this.onElementClickPrepare}
								onTouchStart={this.onElementClickPrepare}
								onTouchMove={this.onElementClickCancel}
								onMouseUp={this.onElementClickStart}
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
	hoverTipEnabled: false, // todo: set to true
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

