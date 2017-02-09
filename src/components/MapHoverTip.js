import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

class MapHoverTip extends React.Component {

	render = () => {
		return (
			<div>
				<div
					style={{
						position: 'absolute',
						top: '50px',
						left: '100px',
						display: this.props.show ? 'block': 'none',
					}}
				>
					{this.props.location.get('id')} - {this.props.location.get('name')}
				</div>
			</div>
		);
	}
}

// MapHoverTip.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
// 	posX: PropTypes.number.isRequired,
// 	posY: PropTypes.number.isRequired,
// 	maxWidth: PropTypes.number.isRequired,
// 	maxHeight: PropTypes.number.isRequired,
// };

export default MapHoverTip;

