import { connect } from 'react-redux';
import { action } from 'Src/utils';
import ApplicationDetails from './ApplicationDetails';
import {
  APPROVE_APPLICATION,
  DISAPPROVE_APPLICATION
} from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  approveApplication: data =>
    dispatch(action(APPROVE_APPLICATION.REQUEST, data)),
  disapproveApplication: data =>
    dispatch(action(DISAPPROVE_APPLICATION.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationDetails);
