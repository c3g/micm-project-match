import React from 'react';
import LoginForm from 'Src/modules/LoginForm';
import './login.scss';
import Heading from 'Src/modules/Heading';
import Navbar from 'Src/modules/Navbar';
import { Link } from 'react-router-dom';
import Button from 'Src/modules/Button';

const Login = () => (
  <div className="login-page">
    <Navbar>
      <Link to="/">Home</Link>
      <Link to="/signup">
        <Button>Sign Up</Button>
      </Link>
    </Navbar>
    <div className="heading-container">
      <Heading>Log In</Heading>
    </div>
    <div className="form-container">
      <LoginForm />
    </div>
  </div>
);

export default Login;
