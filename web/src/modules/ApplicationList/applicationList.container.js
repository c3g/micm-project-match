import { connect } from 'react-redux';
import { action } from 'Src/utils';
import { APPLICATION } from 'Src/constants/actionTypes';
import { pick } from 'ramda';
import ApplicationList from './ApplicationList';

const mapDispatchToProps = dispatch => ({
  fetchApplications: () => dispatch(action(APPLICATION.LIST.REQUEST)),
  clearApplications: () => dispatch(action(APPLICATION.LIST.RECEIVE, []))
});

const mapStateToProps = state => ({
  ...pick(['applications', 'isLoading'], state.applicationList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationList);
