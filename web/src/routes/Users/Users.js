import React from 'react';
import Heading from 'Src/modules/Heading';
import UserList from 'Src/modules/UserList';
import './users.scss';

const Users = () => (
  <div className="users-page">
    <Heading hideUnderline>Users</Heading>
    <UserList />
  </div>
);

export default Users;
