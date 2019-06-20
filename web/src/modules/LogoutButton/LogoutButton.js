import React from 'react';
import { logout } from 'Src/config/endpoints';
import './logoutButton.scss';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const LogoutButton = props => (
  <button
    onClick={() => props.onLogout({ push: props.history.push })}
    href={logout}
    className="logout-button"
  >
    Logout
  </button>
);

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(LogoutButton);
