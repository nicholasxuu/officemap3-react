import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

class MapSearchBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: '',
		}
	};

	onChange = (e) => {
		let value = e.target.value.trim();
		this.setState({
			searchText: value,
		});

		this.props.actions.searchLocation(value)
	};

	render = () => {
		return (
			<div>
				MapSearchBox -
				<input
					type="text"
					onChange={this.onChange.bind(this)}
				/>
				<div>{this.state.searchText}</div>
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

