import { connect } from 'react-redux';
import { PASS_APPLICATION } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';
import ApplicationDetails from './ApplicationDetails';

const mapDispatchToProps = dispatch => ({
  passApplication: data => dispatch(action(PASS_APPLICATION.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationDetails);
