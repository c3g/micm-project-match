import { connect } from 'react-redux';
import { action } from 'Src/utils';
import ApplicationDetails from './ApplicationDetails';
import {
  APPLICATION,
  APPROVE_APPLICATION,
  DISAPPROVE_APPLICATION
} from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  fetchApplications: () => dispatch(action(APPLICATION.LIST.REQUEST)),
  approveApplication: data =>
    dispatch(action(APPROVE_APPLICATION.REQUEST, data)),
  disapproveApplication: data =>
    dispatch(action(DISAPPROVE_APPLICATION.REQUEST, data))
});

const mapStateToProps = state => ({
  isLoading: state.applicationList.isLoading,
  applications: state.applicationList.applications
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationDetails);
