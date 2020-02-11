import { connect } from 'react-redux';
import { action } from 'Src/utils';
import { SNACKBAR } from 'Src/constants/actionTypes';
import Snackbar from './Snackbar';

const mapDispatchToProps = dispatch => ({
  hide: () => dispatch(action(SNACKBAR.HIDE))
});

const mapStateToProps = state => ({
  ...state.snackbar
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
