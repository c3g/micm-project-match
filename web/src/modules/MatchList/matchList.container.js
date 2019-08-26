import { connect } from 'react-redux';
import MatchList from './MatchList';
import { action } from 'Src/utils';
import { pick } from 'ramda';
import {
  MATCH_LIST,
  APPROVE_MATCH,
  DISAPPROVE_MATCH
} from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  listMatches: () => dispatch(action(MATCH_LIST.REQUEST)),
  approveMatch: data => dispatch(action(APPROVE_MATCH.REQUEST, data)),
  disapproveMatch: data => dispatch(action(DISAPPROVE_MATCH.REQUEST, data)),
  clearMatches: () => dispatch(action(MATCH_LIST.RECEIVE, []))
});

const mapStateToProps = state => ({
  ...pick(['matches', 'isLoading'], state.matchList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchList);
