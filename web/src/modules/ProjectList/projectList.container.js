import { connect } from 'react-redux';
import ProjectList from './ProjectList';
import { pick } from 'ramda';
import { PROJECT, USER_PROJECT } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(action(PROJECT.LIST.REQUEST)),
  fetchUserProjects: () => dispatch(action(USER_PROJECT.LIST.REQUEST)),
  clearProjects: () => dispatch(action(PROJECT.LIST.RECEIVE, []))
});

const mapStateToProps = state => ({
  ...pick(['isLoading', 'projects'], state.projectList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
