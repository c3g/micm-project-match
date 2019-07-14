import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from 'Src/modules/UserProfile';
import { Redirect } from 'react-router-dom';
import './user.scss';

const User = ({
  match: {
    params: { id }
  }
}) => (
  <div className="user-page">
    {id ? <UserProfile public id={id} /> : <Redirect to="/" />}
  </div>
);

User.propTypes = {
  match: PropTypes.object.isRequired
};

export default User;
