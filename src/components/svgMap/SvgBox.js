import React from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/svgBox.css';

class SvgBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			matrix: [1, 0, 0, 1, 0, 0],
			dragging: false,
		};
	}

	onDragStart = (e) => {
		// Find start position of drag based on touch/mouse coordinates.
		const startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX;
		const startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;
		const scaleMultiplier = e.currentTarget.getScreenCTM().a;

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
		if (!this.state.dragging) {
			return;
		}

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

						{this.props.image.elements.map(element => {
							if (element.type === 'rect') {
								return <rect
									key={element.id}
									id={element.id}
									opacity={element.opacity}
									height={element.height}
									width={element.width}
									x={element.x}
									y={element.y}
									fill={element.fillColor}
									fillOpacity={element.fillOpacity}
									stroke={element.strokeColor}
									strokeOpacity={element.strokeOpacity}
									strokeWidth={element.strokeWidth}
									onMouseOver={(e) => {this.props.actions.hoverLocation(element.id, this.props.locations, e.clientX, e.clientY)}}
									onMouseDown={(e) => {this.props.actions.selectLocation(element.id, this.props.locations, e.clientX, e.clientY)}}
								/>
							} else if (element.type === 'path') {
								return <path
									key={element.id}
									id={element.id}
									opacity={element.opacity}
									d={element.d}
									fill={element.fillColor}
									fillOpacity={element.fillOpacity}
									stroke={element.strokeColor}
									strokeOpacity={element.strokeOpacity}
									strokeWidth={element.strokeWidth}
									onMouseOver={(e) => {this.props.actions.hoverLocation(element.id, this.props.locations, e.clientX, e.clientY)}}
									onMouseDown={(e) => {this.props.actions.selectLocation(element.id, this.props.locations, e.clientX, e.clientY)}}
								/>
							}
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

SvgBox.propTypes = {
};

export default SvgBox;

