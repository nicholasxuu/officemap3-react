import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import ImageSelector from './ImageSelector';
import { resetMap, switchImage } from '../../actions/map';

const mapStateToProps = state => ({
  imageList: state.imageDataCollection,
  activeImageId: state.mapView.get('activeImageId'),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    switchImage,
    resetMap,
  }, dispatch),
});

const ImageSelectorContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageSelector));

export default ImageSelectorContainer;
