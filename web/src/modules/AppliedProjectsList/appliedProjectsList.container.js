import { connect } from 'react-redux';
import AppliedProjectsList from './AppliedProjectsList';
import { action } from 'Src/utils';
import { APPLIED_PROJECTS, CLAIM_PROJECT } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  getAppliedProjects: () => dispatch(action(APPLIED_PROJECTS.REQUEST)),
  claimProject: data => dispatch(action(CLAIM_PROJECT.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['appliedProjectsList'], state.appliedProjectsList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppliedProjectsList);
