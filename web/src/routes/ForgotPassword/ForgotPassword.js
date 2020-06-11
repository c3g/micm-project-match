import React from 'react';
import ForgotPasswordForm from 'Src/modules/ForgotPasswordForm';
import './forgotPassword.scss';
import Heading from 'Src/modules/Heading';
import Navbar from 'Src/modules/Navbar';
import { Link } from 'react-router-dom';
import Button from 'Src/modules/Button';

const ForgotPassword = () => (
  <div className="forgot-password-page">
    <Navbar>
      <Link to="/">Home</Link>
      <Link to="/signin">
        <Button>Log In</Button>
      </Link>
      <Link to="/signup">
        <Button>Sign Up</Button>
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
