import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImageSelector from './ImageSelector';
import { switchImage } from '../../actions/map';

const mapStateToProps = (state) => {
	let imageList = [];
	state.imageDataCollection.forEach((imageData, imageId) => {
		imageList.push({
			imageId,
			imageName: imageData.get('name'),
		});
	});
	return {
		imageList: imageList,
		activeImageId: state.mapView.get('activeImageId'),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({ switchImage }, dispatch),
	}
};

const ImageSelectorContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageSelector);

export default ImageSelectorContainer;