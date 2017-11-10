import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-bootstrap';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import styled from 'styled-components';
import '../../styles/widgets/mapHoverTip.css';

class MapHoverTip extends React.Component {
  render = () => {
    if (this.props.show === false) {
      return null;
    }

    // if id or name empty, don't display
    if (!this.props.locationObj.has('id') ||
      this.props.locationObj.get('id') === 0 ||
      !this.props.locationObj.has('name') ||
      this.props.locationObj.get('name') === ''
    ) {
      return null;
    }

    return (
      <StyledTooltip
        id="map-hover-tooltip"
        className="in map-hover-tip"
        placement="top"
        left={this.props.clientPosX}
        top={this.props.clientPosY}
      >
        {this.props.locationObj.get('name')}
      </StyledTooltip>
    );
  }
}

const StyledTooltip = styled(Tooltip)`
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  position: fixed;
  zIndex: 2;
  textAlign: center;
  /* prevent causing mouseLeave when mouse touch it */
  pointerEvents: none;
  /* make widget top and center */
  transform: translateX(-50%) translateY(-100%);
`;

MapHoverTip.defaultProps = {
  show: false,
  clientPosX: 0,
  clientPosY: 0,
  locationObj: Immutable.Map({
    id: 0,
    name: '',
  }),
};

MapHoverTip.propTypes = {
  show: PropTypes.bool,
  clientPosX: PropTypes.number,
  clientPosY: PropTypes.number,
  locationObj: ImmutablePropTypes.contains({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default MapHoverTip;

