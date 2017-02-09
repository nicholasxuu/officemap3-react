import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

class MapLocationDetail extends React.Component {

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

// MapLocationDetail.propTypes = {
// 	actions: PropTypes.shape({}).isRequired,
// };

export default MapLocationDetail;

