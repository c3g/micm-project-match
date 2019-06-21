import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './verifyEmail.scss';

class VerifyEmail extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    verifyEmail: PropTypes.func.isRequired
  };

  componentDidMount() {
    const token = new URL(window.location.href).searchParams.get('token');
    if (token) this.props.verifyEmail({ push: this.props.history.push, token });
    else this.props.history.push('/signin');
  }

  render() {
    return <div className="verify-email-page">Verifying Email...</div>;
  }
}

export default VerifyEmail;
