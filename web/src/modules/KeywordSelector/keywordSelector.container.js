import { connect } from 'react-redux';
import { pick } from 'ramda';
import { action } from 'Src/utils';
import KeywordSelector from './KeywordSelector';
import {
  KEYWORD,
  KEYWORD_SELECT,
  KEYWORD_DESELECT
} from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  searchKeyword: data => dispatch(action(KEYWORD.FETCH.REQUEST, data)),
  createKeyword: data => dispatch(action(KEYWORD.CREATE.REQUEST, data)),
  selectKeyword: data => dispatch(action(KEYWORD_SELECT, data)),
  deselectKeyword: data => dispatch(action(KEYWORD_DESELECT, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading', 'keywords', 'selected'], state.keywordSelector)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordSelector);
