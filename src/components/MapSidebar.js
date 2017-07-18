import React from 'react';
import { PropTypes } from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../styles/mapSidebar.css';
import MapSearchBox from './sidebar/MapSearchBoxContainer';
import MapLocationList from './sidebar/MapLocationListContainer';
import { Button, Glyphicon } from 'react-bootstrap';

class MapSidebar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showLocationList: this.props.sidebarType === 'full',
		};
	}

	toggleLocationList = () => {
		if (this.props.searchText.length > 0) {
			// if has search text, work as clear search button.
			this.props.actions.clearSearchText();
		} else {
			// if no search text inside, work as list toggle button
			if (this.state.showLocationList === true) {
				this.setState({showLocationList: false});
			} else {
				this.setState({showLocationList: true});
			}
		}
	};

	render = () => {
		let locationList = null;
		if (this.state.showLocationList === true || this.props.searchText !== '') {
			locationList = <MapLocationList />;
		}

		return (
			<div
				className="map-sidebar"
				style={{
					display: 'flex',
					flexFlow: 'column nowrap',
					overflow: 'hidden',
					maxHeight: '100%',
					height: 'auto',
					maxWidth: '300px',
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 1,
				}}
			>
				<div
					className="map-sidebar-top"
					style={{
						display: 'flex',
						flexFlow: 'row nowrap',
						minHeight: '46px',
						width: '100%',
						position: 'relative',
					}}
				>
					<Button
						bsSize="large"
				        onClick={this.toggleLocationList}
					>
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
	searchText: '',
	sidebarType: 'full',
};

MapSidebar.propTypes = {
	searchText: PropTypes.string.isRequired,
	sidebarType: PropTypes.string.isRequired,
};

export default MapSidebar;

