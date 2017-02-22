import React from 'react';
import { PropTypes } from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/mapSidebar.css';
import MapSearchBox from '../containers/sidebar/MapSearchBox';
import MapLocationList from '../containers/sidebar/MapLocationList';
import { Button, Glyphicon } from 'react-bootstrap';

class MapSidebar extends React.Component {

	renderMinimal = () => {
		return (
			<div className="map-sidebar">
				<Button><Glyphicon glyph="align-justify" /></Button>
			</div>
		)
	};

	renderSearch = () => {
		return (
			<div className="map-sidebar">
				<MapSearchBox/>
			</div>
		)
	};

	renderFull = () => {
		return (
			<div className="map-sidebar">
				<MapSearchBox/>
				<MapLocationList/>
			</div>
		);
	};

	render = () => {
		switch (this.props.sidebarType) {
			case 'minimal':
				return this.renderMinimal();
			case 'search':
				return this.renderSearch();
			case 'full':
			default:
				return this.renderFull();
		}
	};
}

MapSidebar.defaultProps = {
	sidebarType: 'full',
};

MapSidebar.propTypes = {
	sidebarType: PropTypes.string.isRequired,
};

export default MapSidebar;

