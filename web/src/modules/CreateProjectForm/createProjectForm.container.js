import { connect } from 'react-redux';
import CreateProjectForm from './CreateProjectForm';
import { pick } from 'ramda';
import { PROJECT } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';

const mapDispatchToProps = dispatch => ({
  onCreateProject: data => dispatch(action(PROJECT.CREATE.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.createProject)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectForm);
