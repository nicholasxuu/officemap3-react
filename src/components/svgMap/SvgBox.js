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
			dragging: false,
			hovering: false,
			panStartX: 0, // for pan movement calculation
			panStartY: 0, // for pan movement calculation
			scaleMultiplier: 1, // current svg scale factor
		};
	}

	componentDidMount = () => {

	};

	getScaleMultiplier = (e) => {
		return e.currentTarget.getCTM().a; // svg box's scale comparing to current viewport size
	};

	onDragStart = (e) => {
		// // Find start position of drag based on touch/mouse coordinates.
		// const panStartX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
		// const panStartY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
		// const scaleMultiplier = this.getScaleMultiplier(e);
		//
		// // Update state with above coordinates, and set dragging to true.
		// const state = {
		// 	dragging: true,
		// 	panStartX,
		// 	panStartY,
		// 	scaleMultiplier,
		// };
		//
		// this.setState(state);
	};

	onDragMove = (e) => {
		// e.preventDefault();
		// // First check if the state is dragging, if not we can just return
		// // so we do not move unless the user wants to move
		// if (this.state.dragging === true) {
		// 	// Get the new x coordinates
		// 	const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
		// 	const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
		//
		// 	// Take the delta where we are minus where we came from.
		// 	const svgDistanceX = (x - this.state.panStartX) / this.state.scaleMultiplier;
		// 	const svgDistanceY = (y - this.state.panStartY) / this.state.scaleMultiplier;
		//
		// 	// Pan using the deltas
		// 	this.props.actions.svgPan(svgDistanceX, svgDistanceY);
		//
		// 	// Update the state
		// 	this.setState({
		// 		panStartX: x,
		// 		panStartY: y,
		// 	});
		// }
	};

	onDragEnd = (e) => {
		// this.setState({ dragging: false });
	};

	onWheel = (e) => {
		// e.preventDefault();
		// if (e.deltaY < 0) {
		// 	this.props.actions.svgZoom(1.05);
		// } else {
		// 	this.props.actions.svgZoom(0.95);
		// }
	};

	onElementHoverStart = (e) => {
		// const elementId = e.currentTarget.id;
		//
		// // don't hover if selected same object
		// if (this.state.selectedLocationId && elementId === this.state.selectedLocationId.id) {
		// 	return;
		// }
		//
		// const locationObj = this.props.locations.find((location) => {
		// 	return location.get('mapElementId') === elementId;
		// });
		// this.setState({
		// 	hovering: true,
		// 	locationObj: locationObj,
		// });
	};

	onElementHover = (e) => {
		// if (this.state.hovering === true) {
		// 	this.props.actions.hoverData(this.state.locationObj, e.clientX + 10, e.clientY + 10);
		// }
		//
		// if (this.state.selectingLocation === true) {
		// 	this.onElementClickCancel(e);
		// }
	};

	onElementHoverEnd = () => {
		// const locationObj = Immutable.Map({});
		// this.props.actions.hoverData(locationObj, 0, 0);
		// this.setState({
		// 	hovering: false,
		// });
	};

	onElementClickPrepare = (e) => {
		// if (this.state.selectingLocation === false) {
		// 	this.setState({ selectingLocation: true });
		// }
	};

	onElementClickCancel = (e) => {
		// if (this.state.selectingLocation === true) {
		// 	this.setState({ selectingLocation: false });
		// }
	};

	onElementClickStart = (e) => {
		// if (this.state.selectingLocation === true) {
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
					preserveAspectRatio="xMidYMid slice"
					xmlns="http://www.w3.org/2000/svg"
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
							const elementObj = element.toJS(); // for spreading
							delete elementObj.componentName;
							const CurrentComponent = element.get('componentName');
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
};

export default SvgBox;

