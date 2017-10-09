import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {} from '../../actions/map';
import MapHoverTip from './MapHoverTip';

const mapStateToProps = (state) => {
  let show = false;
  if (!state.hoverData.get('locationObj').isEmpty()) {
    show = true;
  }

  return {
    show: show,
    clientPosX: state.hoverData.get('clientPosX'),
    clientPosY: state.hoverData.get('clientPosY'),
    locationObj: state.hoverData.get('locationObj'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch),
  }
};

const MapHoverTipReducer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MapHoverTip));

export default MapHoverTipReducer;