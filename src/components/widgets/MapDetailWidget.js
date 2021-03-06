import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { Popover } from 'react-bootstrap';
import styled from 'styled-components';
import '../../styles/widgets/mapDetailWidget.css';

class MapDetailWidget extends React.Component {
  renderImage = () => {
    if (!this.props.locationObj.get('image')) {
      return null;
    }

    return (
      <div className="widget-image-container">
        <WidgetImage
          className="widget-image"
          src={this.props.locationObj.get('image')}
          alt={this.props.locationObj.get('name')}
        />
      </div>
    );
  };

  renderWidgetBody = () => (
    <div dangerouslySetInnerHTML={{ __html: this.props.locationObj.get('description') }} />
  );

  render = () => {
    // if don't show, don't display
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

    // console.log(this.props.pagePosX, this.props.pagePosY);

    return (
      <StyledPopover
        id="map-detail-widget"
        className="map-detail-widget"
        placement="top"
        positionLeft={this.props.pagePosX}
        positionTop={this.props.pagePosY}
        title={this.props.locationObj.get('name')}
      >
        <WidgetContainer className="widget-container">
          {this.renderImage()}
          <WidgetDetail className="widget-detail">
            {this.renderWidgetBody()}
          </WidgetDetail>
        </WidgetContainer>
      </StyledPopover>
    );
  }
}

const StyledPopover = styled(Popover)`
  zIndex: 3;
  /* make widget top and center */
  transform: translateX(-50%) translateY(-100%);
`;

const WidgetContainer = styled.div`
  display: flex;
  flexFlow: row nowrap;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const WidgetDetail = styled.div`
  display: block;
  overflow: hidden;
  width: 200px;
`;

const WidgetImage = styled.img`
  display: block;
  overflow: hidden;
  width: 100px;
  maxHeight: 100%;
  objectFit: cover;
`;

MapDetailWidget.defaultProps = {
  show: false,
  pagePosX: 0,
  pagePosY: 0,
  locationObj: Immutable.Map({
    id: 0,
  }),
};

MapDetailWidget.propTypes = {
  show: PropTypes.bool,
  pagePosX: PropTypes.number,
  pagePosY: PropTypes.number,
  locationObj: ImmutablePropTypes.contains({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default MapDetailWidget;

