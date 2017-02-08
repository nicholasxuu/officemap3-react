import React, {PropTypes} from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';

class MapLocationListItem extends React.Component {
	render = () => {
		return (
			<div
				onClick={this.props.actions.selectLocation}
			>
				MapLocationListItem - {this.props.location.get('id')} - {this.props.location.get('name')}
			</div>
		);
	}
}

MapLocationListItem.propTypes = {
};

export default MapLocationListItem;

