import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-page">
    MiCM Project Match
    <br />
    <Link to="/signup">Sign Up</Link>
    <br />
    <Link to="/forgotpassword">Forgot Password</Link>
    <br />
    <Link to="/signin">Sign In</Link>
  </div>
);

export default Home;
