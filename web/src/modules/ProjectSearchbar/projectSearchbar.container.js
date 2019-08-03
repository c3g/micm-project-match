import { connect } from 'react-redux';
import { action } from 'Src/utils';
import ProjectSearchbar from './ProjectSearchbar';
import { PROJECT_SEARCH } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onSearch: data => dispatch(action(PROJECT_SEARCH.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.projectSearchbar),
  ...pick(['selected'], state.keywordSelector)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectSearchbar);
