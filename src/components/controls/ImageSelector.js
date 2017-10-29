import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormControl, Button } from 'react-bootstrap';
import Immutable from 'immutable';

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
      <div
        className="image-selector"
        style={{
            position: 'fixed',
            right: '5px',
            bottom: '5px',
            width: '30%',
            maxWidth: '150px',
            minWidth: '100px,',
          }}
      >
        <Button
          componentClass="Button"
          onClick={() => this.goToMap(nextImageId)}
          style={{
            width: '100%',
          }}
          disabled={!nextImageId}
        >
          Up
        </Button>

        <FormControl
          componentClass="select"
          value={this.props.activeImageId}
          onChange={this.onChange}
        >
          {imageList.map((image) => {
            const { imageName, imageId } = image.imageName;
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

        <Button
          componentClass="Button"
          onClick={() => this.goToMap(prevImageId)}
          style={{
            width: '100%',
          }}
          disabled={!prevImageId}
        >
          Down
        </Button>
      </div>
    );
  }
}

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

