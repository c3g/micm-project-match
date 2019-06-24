import React from 'react';
import CVSetupForm from 'Src/modules/CVSetupForm';
import './cvSetup.scss';
import Navbar from 'Src/modules/Navbar';
import LogoutButton from 'Src/modules/LogoutButton';
import Heading from 'Src/modules/Heading';
import RoundedButton from 'Src/modules/RoundedButton';
import { Link } from 'react-router-dom';

const CVSetup = () => (
  <div className="cv-setup-page">
    <Navbar>
      <LogoutButton />
    </Navbar>
    <div className="heading-container">
      <Heading>Setup CV</Heading>
    </div>
    <div className="note">Upload your CV to be viewed on your profile</div>
    <div className="form-container">
      <CVSetupForm />
      <Link to="/">
        <RoundedButton>Skip for now</RoundedButton>
      </Link>
    </div>
  </div>
);

export default CVSetup;
