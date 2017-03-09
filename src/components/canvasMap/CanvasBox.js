import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

class CanvasBox extends React.Component {

	render = () => {
		return (
			<div>
			</div>
		);
	}
}

CanvasBox.defaultProps = {};

CanvasBox.propTypes = {
	actions: PropTypes.shape({}).isRequired,
};

export default CanvasBox;

