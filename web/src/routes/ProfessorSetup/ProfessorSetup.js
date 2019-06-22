import React from 'react';
import './professorSetup.scss';
import Navbar from 'Src/modules/Navbar';
import LogoutButton from 'Src/modules/LogoutButton';

const ProfessorSetup = () => (
  <div className="professor-setup-page">
    <Navbar>
      <LogoutButton />
    </Navbar>
    <div className="form-container" />
  </div>
);

export default ProfessorSetup;
