import { connect } from 'react-redux';
import { action } from 'Src/utils';
import { APPLICATION } from 'Src/constants/actionTypes';
import { pick } from 'ramda';
import ApplicationList from './ApplicationList';

const mapDispatchToProps = dispatch => ({
  fetchApplications: () => dispatch(action(APPLICATION.LIST.REQUEST))
});

const mapStateToProps = state => ({
  ...pick(['applications'], state.applicationList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationList);
