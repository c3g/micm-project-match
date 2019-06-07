import { connect } from 'react-redux';
import { action } from 'Src/utils';
import ForgotPasswordForm from './ForgotPasswordForm';
import { FORGOT_PASSWORD } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(action(FORGOT_PASSWORD.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordForm);
