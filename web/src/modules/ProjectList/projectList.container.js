import { connect } from 'react-redux';
import ProjectList from './ProjectList';
import { pick } from 'ramda';
import { PROJECT } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(action(PROJECT.LIST.REQUEST))
});

const mapStateToProps = state => ({
  ...pick(['isLoading', 'projects'], state.projectList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectList);
