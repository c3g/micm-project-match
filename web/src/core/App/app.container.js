import { connect } from 'react-redux';
import { action } from 'Src/utils';
import { GOTO } from 'Src/constants/actionTypes';
import App from './App';

const mapDispatchToProps = dispatch => ({
  goto: url => dispatch(action(GOTO, url))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
