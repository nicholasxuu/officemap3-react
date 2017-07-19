import React from 'react';
import { PropTypes } from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/mapSidebar.css';
import MapSearchBox from '../sidebar/MapSearchBoxContainer';
import MapLocationList from '../sidebar/MapLocationListContainer';
import { Button, Glyphicon } from 'react-bootstrap';

class MapSidebar extends React.Component {

	toggleLocationList = () => {
		if (this.props.searchText.length > 0) {
			// if has search text, work as clear search button.
			this.props.actions.clearSearchText();
		} else {
			// if no search text inside, work as list toggle button
			if (this.props.isLocationListHidden === true) {
				this.props.actions.activateSidebar();
			} else {
				this.props.actions.deactivateSidebar();
			}
		}
	};

	render = () => {
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
					onClick={this.props.actions.hideDetailWidget}
				>
					<Button
						bsSize="large"
				        onClick={this.toggleLocationList}
					>
						<Glyphicon glyph="menu-hamburger" />
					</Button>

					<MapSearchBox/>
				</div>
				{(this.props.isLocationListHidden) ? '' : <MapLocationList />}
			</div>
		);
	};
}

MapSidebar.defaultProps = {
	searchText: '',
	isLocationListHidden: true,
};

MapSidebar.propTypes = {
	searchText: PropTypes.string.isRequired,
	isLocationListHidden: PropTypes.bool.isRequired,
};

export default MapSidebar;

