import React from 'react';
import Navbar from 'Src/modules/Navbar';
import LogoutButton from 'Src/modules/LogoutButton';

const Profile = () => (
  <div className="profile">
    <Navbar>
      <LogoutButton />
    </Navbar>
    profile
  </div>
);

export default Profile;
