import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

class MapSearchBox extends React.Component {

	onChange = (e) => {
		let value = e.target.value.trim();

		this.props.actions.searchLocation(value)
	};

	render = () => {
		return (
			<div>
				<input
					type="text"
					placeholder="Search"
					onChange={this.onChange.bind(this)}
				/>
			</div>
		);
	}
}

MapSearchBox.propTypes = {
	actions: PropTypes.shape({
		searchLocation: PropTypes.func.isRequired,
    }).isRequired,
};

export default MapSearchBox;

