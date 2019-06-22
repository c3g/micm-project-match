import React from 'react';
import './logoutButton.scss';
import PropTypes from 'prop-types';

const LogoutButton = props => (
  <button onClick={() => props.onLogout()} className="logout-button">
    Logout
  </button>
);

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default LogoutButton;
