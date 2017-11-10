import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListGroupItem } from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/sidebar/mapLocationListItem.css';

const imageWidth = 51;
const innerHeight = 51;
const outerHeight = innerHeight + 2; // add border

class MapLocationListItem extends React.Component {
  renderImage = () => {
    if (!this.props.locationObj.get('image')) {
      return null;
    }

    return (<ListItemImg
      src={this.props.locationObj.get('image')}
      alt={this.props.locationObj.get('name')}
      height={innerHeight}
      width={imageWidth}
    />);
  };

  render = () => {
    if (this.props.locationObj.has('filterHide')) {
      if (this.props.locationObj.get('filterHide') === true) {
        return null;
      }
    } else if (this.props.locationObj.has('hide') &&
      this.props.locationObj.get('hide') === true
    ) {
      return null;
    }

    if (!this.props.locationObj.get('name')) {
      return null;
    }

    return (
      <StyledListGroupItem
        className="map-location-list-item"
        onClick={() => this.props.actions.goToLocation(this.props.locationObj.get('mapElementId'), true)}
        height={outerHeight}
      >
        <ItemImage
          className="item-image"
          width={imageWidth}
          height={innerHeight}
        >
          {this.renderImage()}
        </ItemImage>
        <ItemBody
          className="item-body"
          height={innerHeight}
        >
          <ItemName className="item-name">
            {this.props.locationObj.get('name')}
          </ItemName>
          <ItemDetail className="item-detail">
            {this.props.locationObj.get('brief')}
          </ItemDetail>
        </ItemBody>

      </StyledListGroupItem>
    );
  }
}

const ListItemImg = styled.img`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  object-fit: cover;
  object-position: center;
`;

const StyledListGroupItem = styled(ListGroupItem)`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  padding: 0;
  height: ${props => props.height}px;
  min-height: ${props => props.height}px;
`;

const ItemImage = styled.span`
  width: ${props => props.width}px;
  min-width: ${props => props.width}px;
  height: ${props => props.height}px;
  min-height: ${props => props.height}px;
`;

const ItemBody = styled.span`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 7px 7px;
  height: ${props => props.height}px;
  width: 100%;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
`;

const ItemDetail = styled.div``;

MapLocationListItem.defaultProps = {
  locationObj: Immutable.fromJS({
    hide: false,
    id: null,
    image: '',
    name: '',
    info: '',
    mapElementId: '',
  }),
};

MapLocationListItem.propTypes = {
  locationObj: ImmutablePropTypes.contains({
    hide: PropTypes.bool.isRequired,
    filterHide: PropTypes.bool,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    info: PropTypes.string,
    mapElementId: PropTypes.string.isRequired,
  }),
  actions: PropTypes.shape({
    goToLocation: PropTypes.func.isRequired,
  }).isRequired,
};

export default MapLocationListItem;

