import React from 'react';
import ForgotPasswordForm from 'Src/modules/ForgotPasswordForm';
import './forgotPassword.scss';
import Heading from 'Src/modules/Heading';
import Navbar from 'Src/modules/Navbar';
import { Link } from 'react-router-dom';
import RoundedButton from 'Src/modules/RoundedButton';

const ForgotPassword = () => (
  <div className="forgot-password-page">
    <Navbar>
      <Link to="/">Home</Link>
      <Link to="/signin">
        <RoundedButton>Sign In</RoundedButton>
      </Link>
      <Link to="/signup">
        <RoundedButton>Sign Up</RoundedButton>
      </Link>
    </Navbar>
    <div className="heading-container">
      <Heading>Forgot Password</Heading>
    </div>
    <div className="form-container">
      <ForgotPasswordForm />
    </div>
  </div>
);

export default ForgotPassword;
