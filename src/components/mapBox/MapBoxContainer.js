import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import MapBox from './MapBox';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({}, dispatch),
  }
};

const MapBoxContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapBox));

export default MapBoxContainer;