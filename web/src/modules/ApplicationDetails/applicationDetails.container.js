import { connect } from 'react-redux';
import { APPROVE_APPLICATION } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';
import ApplicationDetails from './ApplicationDetails';

const mapDispatchToProps = dispatch => ({
  approveApplication: data =>
    dispatch(action(APPROVE_APPLICATION.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationDetails);
