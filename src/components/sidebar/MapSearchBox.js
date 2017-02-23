import React, {PropTypes} from 'react';
// import * as ImmutablePropTypes from 'react-immutable-proptypes';
import { InputGroup, FormControl } from 'react-bootstrap';
import '../../styles/sidebar/mapSearchBox.css';

class MapSearchBox extends React.Component {

	onChange = (e) => {
		const value = e.target.value.trim();

		this.props.actions.filterLocation(value)
	};

	render = () => {
		return (
			<div className="map-search-box">
				<InputGroup
					bsSize="large"
					style={{
						width: '100%',
					}}
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

MapSearchBox.defaultProps = {

};

MapSearchBox.propTypes = {
	actions: PropTypes.shape({
		filterLocation: PropTypes.func.isRequired,
    }).isRequired,
};

export default MapSearchBox;

