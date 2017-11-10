import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/sidebar/mapLocationList.css';
import MapLocationListItem from './MapLocationListItemContainer';

// eslint-disable-next-line react/prefer-stateless-function
class MapLocationList extends React.Component {
  // eslint-disable-next-line arrow-body-style
  render = () => {
    return (
      <StyledListGroup className="map-location-list">
        {this.props.locations.map(locationObj =>
          (<MapLocationListItem
            key={locationObj.get('id')}
            locationObj={locationObj}
          />))
        }
      </StyledListGroup>
    );
  }
}

const StyledListGroup = styled(ListGroup)`
  display: flex;
  flex-flow: column nowrap;
  max-width: 100%;
  width: 100%;
  max-height: 100%;
  height: auto;
  overflow-y: scroll;
  overflow-x: auto;
`;

MapLocationList.defaultProps = {
  locations: Immutable.List(),
};

MapLocationList.propTypes = {
  locations: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
  })),
};

export default MapLocationList;

