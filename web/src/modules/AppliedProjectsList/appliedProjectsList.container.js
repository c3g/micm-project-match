import { connect } from 'react-redux';
import AppliedProjectsList from './AppliedProjectsList';
import { action } from 'Src/utils';
import { APPLIED_PROJECTS, CLAIM_PROJECT } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  getAppliedProjects: () => dispatch(action(APPLIED_PROJECTS.REQUEST)),
  clearAppliedProjects: () => dispatch(action(APPLIED_PROJECTS.RECEIVE, [])),
  claimProject: data => dispatch(action(CLAIM_PROJECT.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['appliedProjectsList', 'isLoading'], state.appliedProjectsList),
  ...pick(['id'], state.app.user)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppliedProjectsList);
