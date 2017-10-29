import React from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import '../../styles/widgets/mapHoverTip.css';
import { Tooltip } from 'react-bootstrap';

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
      <Tooltip
        id="map-hover-tooltip"
        className="in map-hover-tip"
        placement="top"
          style={{
            left: this.props.clientPosX,
            top: this.props.clientPosY,
            position: 'fixed',
            zIndex: 2,
            /* prevent causing mouseLeave when mouse touch it */
            pointerEvents: 'none',
            textAlign: 'center',
            /* make widget top and center */
            transform: 'translateX(-50%) translateY(-100%)',
          }}
      >
          {this.props.locationObj.get('name')}
      </Tooltip>
    );
  }
}

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

