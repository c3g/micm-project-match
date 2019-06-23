import React from 'react';
import ProfessorSetupForm from 'Src/modules/ProfessorSetupForm';
import './professorSetup.scss';
import Navbar from 'Src/modules/Navbar';
import LogoutButton from 'Src/modules/LogoutButton';
import Heading from 'Src/modules/Heading';

const ProfessorSetup = () => (
  <div className="professor-setup-page">
    <Navbar>
      <LogoutButton />
    </Navbar>
    <div className="heading-container">
      <Heading>Setup Details</Heading>
    </div>
    <div className="note">Enter your department and position details</div>
    <div className="form-container">
      <ProfessorSetupForm />
    </div>
  </div>
);

export default ProfessorSetup;
