import React from 'react';
import Immutable from 'immutable';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/svgBox.css';

class SvgBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			matrix: [1, 0, 0, 1, 0, 0],
			dragging: false,
			hovering: false,
			selectedLocationDOM: null,
		};
	}

	onDragStart = (e) => {
		// Find start position of drag based on touch/mouse coordinates.
		const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
		const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
		const scaleMultiplier = e.currentTarget.getCTM().a; // svg box's scale comparing to current viewport size

		// Update state with above coordinates, and set dragging to true.
		const state = {
			dragging: true,
			startX,
			startY,
			scaleMultiplier,
		};

		this.setState(state);
	};

	onDragMove = (e) => {
		// First check if the state is dragging, if not we can just return
		// so we do not move unless the user wants to move
		if (this.state.dragging === true) {
			// Get the new x coordinates
			const x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
			const y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

			// Take the delta where we are minus where we came from.
			const dx = (x - this.state.startX) / this.state.scaleMultiplier;
			const dy = (y - this.state.startY) / this.state.scaleMultiplier;

			// Pan using the deltas
			this.pan(dx, dy);

			// Update the state
			this.setState({
				startX: x,
				startY: y,
			});
		}

		this.updateSelectedTip();
	};

	onDragEnd = (e) => {
		this.setState({ dragging: false });
	};

	onWheel = (e) => {
		if (e.deltaY < 0) {
			this.zoom(1.05);
		} else {
			this.zoom(0.95);
		}

		this.updateSelectedTip();
	};

	updateSelectedTip = (selectedLocationDOM = null) => {
		if (selectedLocationDOM !== null) {
			this.setState({ selectedLocationDOM: selectedLocationDOM });
		}

		if (this.state.selectedLocationDOM !== null) {
			selectedLocationDOM = this.state.selectedLocationDOM;
		}

		if (selectedLocationDOM !== null) {
			const currentTarget = selectedLocationDOM;
			const elementId = currentTarget.id;
			const locationObj = this.props.locations.find((location) => {
				return location.get('mapElementId') === elementId;
			});
			const coordinates = currentTarget.getCTM();
			const { elementX, elementY } = this.getElementCenter(currentTarget);
			const scaleMultiplier = coordinates.a; // svg box's scale comparing to current viewport size
			this.props.actions.selectLocation(locationObj, coordinates.e + elementX * scaleMultiplier, coordinates.f + elementY * scaleMultiplier);
		}
	};

	getElementCenter = (DomElement) => {
		let centerX = 0;
		let centerY = 0;
		switch (DomElement.getAttribute('type')) {
			case 'path':
				let svgD = DomElement.getAttribute('d');
				// i.e. m159.82008,340.61655l206.76723,-0.99887l0,244.7245l-155.82458,0l-50.94265,-243.72563z
				svgD = svgD.substr(1, svgD.length-2);
				const pathList = svgD.split('l').map(item => item.split(',').map(number => parseFloat(number)));
				let edgeMaxX = 0;
				let edgeMinX = 0;
				let edgeMaxY = 0;
				let edgeMinY = 0;
				let currPoint = null;
				pathList.map(vector => {
					if (currPoint === null) {
						currPoint = vector;

						edgeMaxX = currPoint[0];
						edgeMinX = currPoint[0];
						edgeMaxY = currPoint[1];
						edgeMinY = currPoint[1];
					} else {
						currPoint[0] = currPoint[0] + vector[0];
						currPoint[1] = currPoint[1] + vector[1];

						edgeMaxX = Math.max(currPoint[0], edgeMaxX);
						edgeMinX = Math.min(currPoint[0], edgeMinX);
						edgeMaxY = Math.max(currPoint[1], edgeMaxY);
						edgeMinY = Math.min(currPoint[1], edgeMinY);
					}

					return vector;
				});
				centerX = (edgeMinX + edgeMaxX) / 2;
				centerY = (edgeMinY + edgeMaxY) / 2;
				break;
			case 'rect':
				centerX = parseFloat(DomElement.getAttribute('x')) + (parseFloat(DomElement.getAttribute('width')) / 2);
				centerY = parseFloat(DomElement.getAttribute('y')) + (parseFloat(DomElement.getAttribute('height')) / 2);
				break;
		}
		return {
			elementX: centerX,
			elementY: centerY,
		};
	};

	onElementHoverStart = (e) => {
		const elementId = e.currentTarget.id;
		const locationObj = this.props.locations.find((location) => {
			return location.get('mapElementId') === elementId;
		});
		this.setState({
			hovering: true,
			locationObj: locationObj,
		});
	};

	onElementHover = (e) => {
		if (this.state.hovering === true) {
			// const { elementX, elementY } = this.getElementCenter(e.currentTarget);
			this.props.actions.hoverLocation(this.state.locationObj, e.clientX + 10, e.clientY + 10);
		}
	};

	onElementHoverEnd = (e) => {
		const locationObj = Immutable.Map({});
		this.props.actions.hoverLocation(locationObj, e.clientX + 10, e.clientY + 10);
		this.setState({
			hovering: false,
		});
	};

	onElementClickStart = (e) => {
		this.updateSelectedTip(e.currentTarget);
	};

	pan = (dx, dy) => {
		const m = this.state.matrix;
		m[4] += dx;
		m[5] += dy;
		this.setState({ matrix: m });
	};

	zoom = (scale) => {
		const m = this.state.matrix;
		const len = m.length;
		for (let i = 0; i < len; i++) {
			m[i] *= scale;
		}
		m[4] += (1 - scale) * this.props.image.width / 2;
		m[5] += (1 - scale) * this.props.image.height / 2;
		this.setState({ matrix: m });
	};

	render = () => {
		const viewBox = [0, 0, this.props.image.width, this.props.image.height].join(' ');
		return (
			<div className="svg-box">
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
						transform={`matrix(${this.state.matrix.join(' ')})`}
					>
						<image
							xlinkHref={this.props.image.url}
							x="0"
							y="0"
							height={this.props.image.height}
							width={this.props.image.width}
						/>

						{this.props.image.elements.map(element =>
							<element.type
								key={element.id}
								{...element}
								onMouseEnter={this.onElementHoverStart}
								onMouseMove={this.onElementHover}
								onMouseLeave={this.onElementHoverEnd}
							    onMouseUp={this.onElementClickStart}
							/>
						)}

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

SvgBox.propTypes = {
};

export default SvgBox;

