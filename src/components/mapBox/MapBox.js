/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import '../../styles/mapBox.css';
import SvgBox from '../svgMap/SvgBoxContainer';
import MapHoverTip from '../widgets/MapHoverTipContainer';
import MapDetailWidget from '../widgets/MapDetailWidgetContainer';

class MapBox extends React.Component {
  // eslint-disable-next-line arrow-body-style
  render = () => {
    return (
      <MapBoxContainer className="map-box-container">
        <SvgBox />
        <MapHoverTip />
        <MapDetailWidget />
      </MapBoxContainer>
    );
  }
}

const MapBoxContainer = styled.div`
  height: 100%;
  width: 100%;
  backgroundColor: #ffffff;
  overflow: hidden;
  position: relative;
`;

Map.defaultProps = {
};

Map.propTypes = {
};

export default MapBox;

