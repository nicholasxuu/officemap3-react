import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import { ListGroup } from 'react-bootstrap';
import '../../styles/sidebar/mapLocationList.css';
import MapLocationListItem from './MapLocationListItemContainer';

// eslint-disable-next-line react/prefer-stateless-function
class MapLocationList extends React.Component {
  // eslint-disable-next-line arrow-body-style
  render = () => {
    return (
      <ListGroup
        className="map-location-list"
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          maxWidth: '100%',
          width: '100%',
          maxHeight: '100%',
          height: 'auto',
          overflow: 'scroll',
        }}
      >
        {this.props.locations.map(locationObj =>
          (<MapLocationListItem
            key={locationObj.get('id')}
            locationObj={locationObj}
          />))
        }
      </ListGroup>
    );
  }
}

MapLocationList.defaultProps = {
  locations: Immutable.List(),
};

MapLocationList.propTypes = {
  locations: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
  })),
};

export default MapLocationList;

