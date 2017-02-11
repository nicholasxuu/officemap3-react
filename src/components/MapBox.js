import React from 'react';
import _ from 'underscore';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/mapBox.css';
import SvgBox from '../containers/svgMap/SvgBox';


class MapBox extends React.Component {
	constructor(props) {
		super(props);
		// this._throttledMouseMove = _.throttle(this._throttledMouseMove.bind(this), 40);
	}

	_throttledMouseMove = (e) => {
		// this.props.actions.hoverLocation(this.props.locations.get(1), e.pageX, e.pageY);
	};

	_onMouseMove = (e) => {
		// e.persist();
		// this._throttledMouseMove(e);
	};

	_onMouseDown = (e) => {
		// this.props.actions.selectLocation(this.props.locations.get(0), e.pageX+100, e.pageY+100);
	};

	render = () => {
		return (
			<div className="map-box"
			     onMouseMove={this._onMouseMove}
			     onMouseDown={this._onMouseDown}
			>
				<SvgBox />
			</div>
		);
	}
}

MapBox.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
};

export default MapBox;

