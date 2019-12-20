import { connect } from 'react-redux';
import CreateProjectForm from './ApplicationForm';
import { pick } from 'ramda';
import { CV_UPLOAD, APPLICATION } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';

const mapDispatchToProps = dispatch => ({
  createApplication: data => dispatch(action(APPLICATION.CREATE.REQUEST, data)),
  updateApplication: data => dispatch(action(APPLICATION.UPDATE.REQUEST, data)),
  onSubmitCV: data => dispatch(action(CV_UPLOAD.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.createProject),
  user: state.app.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectForm);
