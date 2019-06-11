import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Captcha from 'Src/modules/Captcha';
import './forgotPasswordForm.scss';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';

let ForgotPasswordForm = props => (
  <div className="forgot-password-form">
    <div className="form">
      <form onSubmit={props.handleSubmit}>
        <Field
          name="email"
          component={InputField}
          type="email"
          placeholder="Email"
        />
        <div className="captcha-container">
          <Field name="captchaResponse" component={Captcha} />
        </div>
        <div className="continue-button">
          <RoundedButton>Continue</RoundedButton>
        </div>
      </form>
    </div>
  </div>
);

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm);

export default withRouter(ForgotPasswordForm);
