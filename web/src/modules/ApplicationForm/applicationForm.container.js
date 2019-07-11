import { connect } from 'react-redux';
import CreateProjectForm from './ApplicationForm';
import { pick } from 'ramda';
import { APPLICATION } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';

const mapDispatchToProps = dispatch => ({
  onCreateApplication: data =>
    dispatch(action(APPLICATION.CREATE.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.createProject)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectForm);
