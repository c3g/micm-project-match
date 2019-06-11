import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Captcha from 'Src/modules/Captcha';
import './forgotPasswordForm.scss';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';

const ForgotPasswordField = ({ input, type, placeholder }) => (
  <InputField {...input} type={type} placeholder={placeholder} />
);

ForgotPasswordField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

let ForgotPasswordForm = props => (
  <div className="forgot-password-form">
    {!props.complete ? (
      <div className="form">
        <form onSubmit={props.handleSubmit}>
          <Field
            name="email"
            component={ForgotPasswordField}
            type="email"
            placeholder="Email"
          />
          <div className="captcha-container">
            <Field name="captchaResponse" component={Captcha} />
          </div>
          <div className="centered-button">
            <RoundedButton>Continue</RoundedButton>
          </div>
        </form>
      </div>
    ) : (
      <div className="form-complete">
        A verification link has been e-mailed to {props.email}. Follow it to
        reset your password
      </div>
    )}
  </div>
);

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired
};

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm);

export default withRouter(ForgotPasswordForm);
