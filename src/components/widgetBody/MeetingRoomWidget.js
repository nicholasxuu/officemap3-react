import React from 'react';

class MeetingRoomWidget extends React.Component {
	render = () => {
		return (
			<div>

			</div>
		);
	}
}

MeetingRoomWidget.defaultProps = {
	status: '',
	phone: {},
	schedules: [],
};

MeetingRoomWidget.propTypes = {

};

export default MeetingRoomWidget;