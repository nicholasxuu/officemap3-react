import React from 'react';
import { PropTypes } from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/mapSidebar.css';
import MapSearchBox from '../containers/sidebar/MapSearchBox';
import MapLocationList from '../containers/sidebar/MapLocationList';
import { Button, Glyphicon } from 'react-bootstrap';

class MapSidebar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showLocationList: this.props.sidebarType === 'full',
		};
	}

	toggleLocationList = () => {
		if (this.state.showLocationList === true) {
			this.setState({showLocationList: false});
		} else {
			this.setState({showLocationList: true});
		}
	};

	render = () => {
		let locationList = null;
		if (this.state.showLocationList === true || this.props.searchText !== '') {
			locationList = <MapLocationList />;
		}

		return (
			<div className="map-sidebar">
				<div className="map-sidebar-top">
					<Button bsSize="large" onClick={this.toggleLocationList}>
						<Glyphicon glyph="menu-hamburger" />
					</Button>
					<MapSearchBox/>
				</div>
				{locationList}
			</div>
		);
	};
}

MapSidebar.defaultProps = {
	sidebarType: 'full',
};

MapSidebar.propTypes = {
	sidebarType: PropTypes.string.isRequired,
};

export default MapSidebar;

