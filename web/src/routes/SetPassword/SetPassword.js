import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SetPasswordForm from 'Src/modules/SetPasswordForm';
import Heading from 'Src/modules/Heading';
import './setPassword.scss';
import Navbar from 'Src/modules/Navbar';
import { Link } from 'react-router-dom';
import RoundedButton from 'Src/modules/RoundedButton';

class SetPassword extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    token: ''
  };

  componentDidMount() {
    const token = new URL(window.location.href).searchParams.get('token');
    if (token) this.setState({ token });
    else this.props.history.push('/login');
  }

  render() {
    return (
      <div className="set-password-page">
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
          <Heading>Set Password</Heading>
        </div>
        <div className="form-container">
          <SetPasswordForm token={this.state.token} />
        </div>
      </div>
    );
  }
}

export default SetPassword;
