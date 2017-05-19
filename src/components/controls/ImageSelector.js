import React from 'react';
import { PropTypes } from 'prop-types';
import { FormControl } from 'react-bootstrap';

class ImageSelector extends React.Component {

	onChange = (e) => {
		const imageId = e.target.value;
		this.props.actions.switchImage(imageId);
	};

	render = () => {
		if (this.props.imageList.size <= 1) {
			return null;
		}
		return (
			<div
				className="image-selector"
			    style={{
			    	position: 'fixed',
				    right: '5px',
				    top: '5px',
			    }}
			>
				<FormControl componentClass="select" value={this.props.activeImageId} onChange={this.onChange.bind(this)}>
					{this.props.imageList.map(image => {
						const imageName = image.imageName;
						const imageId = image.imageId;
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
			</div>
		);
	}
}

ImageSelector.defaultProps = {
	imageList: [],
	activeImageId: null,
};

ImageSelector.propTypes = {
	imageList: PropTypes.arrayOf(PropTypes.shape({
		imageName: PropTypes.string.isRequired,
		imageId: PropTypes.string.isRequired,
	})),
	activeImageId: PropTypes.string.isRequired,
	actions: PropTypes.shape({
		switchImage: PropTypes.func.isRequired,
	}).isRequired,
};

export default ImageSelector;

