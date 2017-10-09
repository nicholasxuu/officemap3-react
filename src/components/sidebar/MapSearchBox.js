import React from 'react';
import { PropTypes } from 'prop-types';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { InputGroup, FormControl } from 'react-bootstrap';
import '../../styles/sidebar/mapSearchBox.css';

class MapSearchBox extends React.Component {

  onChange = (e) => {
    const value = e.target.value.trim();

    this.props.actions.filterLocation(value)
  };

  onClick = (e) => {
    if (this.props.isLocationListHidden) {
      const value = e.target.value.trim();
      this.props.actions.filterLocation(value)
    }
  };

  render = () => {
    return (
      <div
        className="map-search-box"
          style={{
            width: '100%',
          }}
      >
        <InputGroup
          bsSize="large"
          style={{
            width: '100%',
          }}
        >
          <FormControl
            placeholder="Search"
            onChange={this.onChange.bind(this)}
            onClick={this.onClick.bind(this)}
            type="text"
              value={this.props.searchText}
          />
        </InputGroup>
      </div>
    );
  }
}

MapSearchBox.defaultProps = {
  searchText: '',
  isLocationListHidden: false,
};

MapSearchBox.propTypes = {
  searchText: PropTypes.string.isRequired,
  isLocationListHidden: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    filterLocation: PropTypes.func.isRequired,
    }).isRequired,
};

export default MapSearchBox;

