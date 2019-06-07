import React from 'react';
import ForgotPasswordForm from 'Src/modules/ForgotPasswordForm';
import './forgotPassword.scss';

const ForgotPassword = () => (
  <div className="forgot-password-page">
    <div className="form-container">
      <ForgotPasswordForm />
    </div>
  </div>
);

export default ForgotPassword;
