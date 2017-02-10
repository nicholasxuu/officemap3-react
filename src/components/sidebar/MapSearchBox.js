import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { InputGroup, FormControl } from 'react-bootstrap';

class MapSearchBox extends React.Component {

	onChange = (e) => {
		let value = e.target.value.trim();

		this.props.actions.searchLocation(value)
	};

	render = () => {
		return (
			<div>
				<InputGroup
					bsSize="large"
				>
					<FormControl
						placeholder="Search"
						onChange={this.onChange.bind(this)}
						type="text"
					/>
				</InputGroup>
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

