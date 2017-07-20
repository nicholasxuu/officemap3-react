import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import WorkspaceWidget from './WorkspaceWidget';

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

const WorkspaceWidgetContainer = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkspaceWidget));

export default WorkspaceWidgetContainer;