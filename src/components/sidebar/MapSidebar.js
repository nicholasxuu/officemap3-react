import React from 'react';
import PropTypes from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { Button, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/mapSidebar.css';
import MapSearchBox from '../sidebar/MapSearchBoxContainer';
import MapLocationList from '../sidebar/MapLocationListContainer';

class MapSidebar extends React.Component {
  toggleLocationList = () => {
    if (this.props.searchText.length > 0) {
      // if has search text, work as clear search button.
      this.props.actions.clearSearchText();
    } else if (this.props.isLocationListHidden === true) {
      // if no search text inside, work as list toggle button
      this.props.actions.activateSidebar();
    } else {
      this.props.actions.deactivateSidebar();
    }
  };

  // eslint-disable-next-line arrow-body-style
  render = () => {
    return (
      <MapSidebarContainer className="map-sidebar">
        <MapSidebarTop
          className="map-sidebar-top"
          onClick={this.props.actions.clearMap}
        >
          <Button
            bsSize="large"
            onClick={this.toggleLocationList}
          >
            <Glyphicon glyph="menu-hamburger" />
          </Button>

          <MapSearchBox />
        </MapSidebarTop>
        {(this.props.isLocationListHidden) ? '' : <MapLocationList />}
      </MapSidebarContainer>
    );
  };
}

const MapSidebarContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  max-height: 100%;
  height: auto;
  width: 100%;
  max-width: 800px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const MapSidebarTop = styled.div`
  display: flex;
  flex-flow: row nowrap;
  min-height: 46px;
  width: 100%;
  position: relative;
`;

MapSidebar.defaultProps = {
  searchText: '',
  isLocationListHidden: true,
};

MapSidebar.propTypes = {
  searchText: PropTypes.string,
  isLocationListHidden: PropTypes.bool,
  actions: PropTypes.shape({
    clearSearchText: PropTypes.func.isRequired,
    activateSidebar: PropTypes.func.isRequired,
    deactivateSidebar: PropTypes.func.isRequired,
    clearMap: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapSidebar;

