import { connect } from 'react-redux';
import { action } from 'Src/utils';
import RegisterForm from './RegisterForm';
import { REGISTER } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onRegister: data => dispatch(action(REGISTER.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
