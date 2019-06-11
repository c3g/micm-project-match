import { connect } from 'react-redux';
import { action } from 'Src/utils';
import RegisterForm from './RegisterForm';
import { REGISTER, REGISTER_EMAIL } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onRegister: data => dispatch(action(REGISTER.REQUEST, data)),
  onResendMail: data => dispatch(action(REGISTER_EMAIL.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['email', 'complete'], state.register)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
