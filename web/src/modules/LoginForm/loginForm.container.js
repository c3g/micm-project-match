import { connect } from 'react-redux';
import { action } from 'Src/utils';
import LoginForm from './LoginForm';
import { LOGIN } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onLogin: data => dispatch(action(LOGIN.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.login)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
