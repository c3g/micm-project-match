import { connect } from 'react-redux';
import CreateProjectForm from './CreateProjectForm';
import { pick } from 'ramda';
import { PROJECT, KEYWORD_SELECT } from 'Src/constants/actionTypes';
import { action } from 'Src/utils';

const mapDispatchToProps = dispatch => ({
  onCreateProject: data => dispatch(action(PROJECT.CREATE.REQUEST, data)),
  onUpdateProject: data => dispatch(action(PROJECT.UPDATE.REQUEST, data)),
  initializeKeyword: data => dispatch(action(KEYWORD_SELECT, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.createProject),
  ...pick(['selected'], state.keywordSelector)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectForm);
