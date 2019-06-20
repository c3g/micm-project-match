import React from 'react';
import SetupForm from 'Src/modules/SetupForm';
import './setup.scss';
import Navbar from 'Src/modules/Navbar';
import LogoutButton from 'Src/modules/LogoutButton';

const Setup = () => (
  <div className="setup-page">
    <Navbar>
      <LogoutButton />
    </Navbar>
    <div className="form-container">
      <SetupForm />
    </div>
  </div>
);

export default Setup;
