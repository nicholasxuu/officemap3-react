import React from 'react';
import PropTypes from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/sidebar/mapSearchBox.css';

class MapSearchBox extends React.Component {

  onChange = (e) => {
    const value = e.target.value.trim();

    this.props.actions.filterLocation(value);
  };

  onClick = (e) => {
    if (this.props.isLocationListHidden) {
      const value = e.target.value.trim();
      this.props.actions.filterLocation(value);
    }
  };

  render = () => {
    return (
      <MapSearchBoxContainer className="map-search-box">
        <StyledInputGroup bsSize="large">
          <FormControl
            placeholder="Search"
            onChange={this.onChange}
            onClick={this.onClick}
            type="text"
            value={this.props.searchText}
          />
        </StyledInputGroup>
      </MapSearchBoxContainer>
    );
  }
}

const MapSearchBoxContainer = styled.div`
  width: 100%;
`;

const StyledInputGroup = styled(InputGroup)`
  width: 100%;
`;

MapSearchBox.defaultProps = {
  searchText: '',
  isLocationListHidden: false,
};

MapSearchBox.propTypes = {
  searchText: PropTypes.string,
  isLocationListHidden: PropTypes.bool,
  actions: PropTypes.shape({
    filterLocation: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapSearchBox;

