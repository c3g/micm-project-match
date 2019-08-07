import React from 'react';
import Heading from 'Src/modules/Heading';
import ApplicationList from 'Src/modules/ApplicationList';
import './applications.scss';

const Applications = () => (
  <div className="applications-page">
    <Heading hideUnderline>Applications</Heading>
    <div className="application-list-container">
      <ApplicationList />
    </div>
  </div>
);

export default Applications;
