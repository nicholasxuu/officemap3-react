import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MeetingRoomWidget from './MeetingRoomWidget';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({

    }, dispatch),
  }
};

const MeetingRoomWidgetContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MeetingRoomWidget));

export default MeetingRoomWidgetContainer;