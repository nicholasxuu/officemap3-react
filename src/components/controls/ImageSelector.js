import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormControl } from 'react-bootstrap';
import Immutable from 'immutable';
import styled from 'styled-components';
import GoToMapButton from './GoToMapButton';

class ImageSelector extends React.Component {
  onChange = (e) => {
    const imageId = e.target.value;
    this.goToMap(imageId);
  };

  goToMap = (imageId) => {
    this.props.actions.resetMap();
    this.props.actions.switchImage(imageId);
  };

  render = () => {
    if (this.props.imageList.size <= 1 || this.props.activeImageId === '') {
      return null;
    }

    let activeImageIdIndex = null;

    // process image list here.
    // note: must parse immutable map to mutable list here. JSX doesn't like immutable map.
    const imageList = [];
    let i = 0;
    this.props.imageList.forEach((imageData, imageId) => {
      if (imageId === this.props.activeImageId) {
        activeImageIdIndex = i;
      }
      i += 1;

      imageList.push({
        imageId,
        imageName: imageData.get('name'),
      });
    });

    if (activeImageIdIndex === null) {
      console.warn('Warning: active image Id is not found in the list');
      return null;
    }

    let nextImageId = '';
    if (activeImageIdIndex + 1 < imageList.length) {
      nextImageId = imageList[activeImageIdIndex + 1].imageId;
    }

    let prevImageId = '';
    if (activeImageIdIndex > 0) {
      prevImageId = imageList[activeImageIdIndex - 1].imageId;
    }

    return (
      <ImageSelectorContainer className="image-selector-container">
        <GoToMapButton
          targetImageId={nextImageId}
          goToMap={this.goToMap}
          disabled={!nextImageId}
        >
          Up
        </GoToMapButton>

        <FormControl
          componentClass="select"
          value={this.props.activeImageId}
          onChange={this.onChange}
        >
          {imageList.map((image) => {
            const { imageName, imageId } = image;
            return (
              <option
                key={imageId}
                value={imageId}
              >
                {imageName}
              </option>
            );
          })}
        </FormControl>

        <GoToMapButton
          targetImageId={prevImageId}
          goToMap={this.goToMap}
          disabled={!prevImageId}
        >
          Down
        </GoToMapButton>
      </ImageSelectorContainer>
    );
  }
}

const ImageSelectorContainer = styled.div`
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: 30%;
  max-width: 150px;
  min-width: 100px;
`;

ImageSelector.defaultProps = {
  imageList: Immutable.fromJS({}),
  activeImageId: '',
};

ImageSelector.propTypes = {
  imageList: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.mapContains({
      name: PropTypes.string.isRequired,
    }),
    PropTypes.string.isRequired,
  ),
  activeImageId: PropTypes.string,
  actions: PropTypes.shape({
    switchImage: PropTypes.func.isRequired,
    resetMap: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImageSelector;

