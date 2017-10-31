import React from 'react';
import PropTypes from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { Button, Glyphicon } from 'react-bootstrap';
import '../../styles/mapSidebar.css';
import MapSearchBox from '../sidebar/MapSearchBoxContainer';
import MapLocationList from '../sidebar/MapLocationListContainer';

class MapSidebar extends React.Component {

  toggleLocationList = () => {
    if (this.props.searchText.length > 0) {
      // if has search text, work as clear search button.
      this.props.actions.clearSearchText();
    } else {
      // if no search text inside, work as list toggle button
      if (this.props.isLocationListHidden === true) {
        this.props.actions.activateSidebar();
      }
      this.props.actions.deactivateSidebar();
    }
  };

  // eslint-disable-next-line arrow-body-style
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
          width: '100%',
          maxWidth: '800px',
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
          onClick={this.props.actions.clearMap}
        >
          <Button
            bsSize="large"
            onClick={this.toggleLocationList}
          >
            <Glyphicon glyph="menu-hamburger" />
          </Button>

          <MapSearchBox />
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

