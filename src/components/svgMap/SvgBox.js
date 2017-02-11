import React from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/svgMap/svgBox.css';

class SvgBox extends React.Component {

	constructor(props) {
		super(props);
		this.selectedElement = 0;
		this.currentX = 0;
		this.currentY = 0;
		this.focusedElement = 0;
		this.currentMatrix = 0;

		this.props.image.viewBox = [0, 0, this.props.image.width, this.props.image.height].join(' ');
	}

	_getCurrentMatrix = (element) => {
		let matrix = element.getAttributeNS(null, "transform").slice(7,-1).split(' ');

		for (let i=0; i < matrix.length; i++) {
			matrix[i] = parseFloat(matrix[i]);
		}
		return matrix;
	};

	_selectElement = (e) => {
		this.selectedElement = e.currentTarget;
		this.currentX = e.clientX;
		this.currentY = e.clientY;
		this.currentMatrix = this._getCurrentMatrix(this.selectedElement);
		this.multiplier = this.selectedElement.parentElement.getScreenCTM().a; // todo: need to make sure parent is <svg />
	};

	_deselectElement = (e) => {
		if (this.selectedElement !== 0){
			this.selectedElement = 0;
		}
	};

	_focusElement = (e) => {
		this.focusedElement = e.currentTarget;
		this.currentMatrix = this._getCurrentMatrix(this.focusedElement);
	};

	_unfocusElement = (e) => {
		if (this.focusedElement !== 0) {
			this.focusedElement = 0;
		}
	};

	_leaveElement = (e) => {
		this._unfocusElement(e);
		this._deselectElement(e);
	};

	_moveElement = (e) => {
		if (this.selectedElement !== 0) {
			this.currentMatrix[4] += (e.clientX - this.currentX) / this.multiplier;
			this.currentMatrix[5] += (e.clientY - this.currentY) / this.multiplier;

			this.selectedElement.setAttributeNS(null, "transform", "matrix(" + this.currentMatrix.join(' ') + ")");

			this.currentX = e.clientX;
			this.currentY = e.clientY;
		}
	};

	_resizeElement = (e) => {
		if (this.focusedElement !== 0) {
			e.preventDefault();

			let scaleChange = e.deltaY / 200 * -1;

			// change zoom
			this.currentMatrix[0] += scaleChange;
			this.currentMatrix[3] += scaleChange;

			// make zoom from the center, not top left corner
			this.currentMatrix[4] -= scaleChange * 100;
			this.currentMatrix[5] -= scaleChange * 100;

			this.focusedElement.setAttributeNS(null, "transform", "matrix(" + this.currentMatrix.join(' ') + ")");
		}
	};

	render = () => {
		return (
			<div className="svg-box">
				<svg
					viewBox={this.props.image.viewBox}
					preserveAspectRatio="xMidYMid slice"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					onMouseLeave={this._leaveElement}
				>
					<g
						className="draggable"
						onMouseUp={this._deselectElement}
						onMouseDown={this._selectElement}
						onMouseMove={this._moveElement}

						onMouseEnter={this._focusElement}
						onMouseLeave={this._unfocusElement}
						onWheel={this._resizeElement}

						transform="matrix(1 0 0 1 0 0)"
					>
						<image xlinkHref={this.props.image.url} x="0" y="0" height="1400" width="1400"/>

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

