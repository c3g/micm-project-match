import React from 'react';
import RegisterForm from 'Src/modules/RegisterForm';
import './register.scss';
import Heading from 'Src/modules/Heading';
import Navbar from 'Src/modules/Navbar';
import { Link } from 'react-router-dom';
import Button from 'Src/modules/Button';

const Register = () => (
  <div className="register-page">
    <Navbar>
      <Link to="/">Home</Link>
      <Link to="/signin">
        <Button>Log In</Button>
      </Link>
    </Navbar>
    <div className="heading-container">
      <Heading>Sign Up</Heading>
    </div>
    <div className="form-container">
      <RegisterForm />
    </div>
  </div>
);

export default Register;
