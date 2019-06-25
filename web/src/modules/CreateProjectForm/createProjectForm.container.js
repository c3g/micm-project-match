import { connect } from 'react-redux';
import CreateProjectForm from './CreateProjectForm';
import { pick } from 'ramda';

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.createProject)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectForm);
