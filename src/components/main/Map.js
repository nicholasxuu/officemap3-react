import React from 'react';
import PropTypes from 'prop-types';
import queryParam from 'query-string';
import styled from 'styled-components';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/map.css';
import MapBox from '../mapBox/MapBoxContainer';
import MapSidebar from '../sidebar/MapSidebarContainer';
import ImageSelector from '../controls/ImageSelectorContainer';

// eslint-disable-next-line react/prefer-stateless-function
class Map extends React.Component {
  componentDidMount = () => {
    const { search } = this.props.location;
    if (search) {
      const query = queryParam.parse(search);
      if (query.location) {
        this.props.actions.goToLocation(query.location, true);
      } else if (query.search) {
        this.props.actions.filterLocation(query.search);
      }
    }
  };

  render = () => (
    <MapContainer className="map-container">
      <MapSidebar />
      <MapBox />
      <ImageSelector />
    </MapContainer>
  )
}

const MapContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
`;

Map.defaultProps = {
  location: {
    search: null,
  },
};

Map.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  actions: PropTypes.shape({
    goToLocation: PropTypes.func.isRequired,
    filterLocation: PropTypes.func.isRequired,
  }).isRequired,
};

export default Map;

