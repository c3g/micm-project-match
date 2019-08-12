import React from 'react';
import Heading from 'Src/modules/Heading';
import './appliedProjects.scss';
import AppliedProjectsList from 'Src/modules/AppliedProjectsList';

const AppliedProjects = () => (
  <div className="applied-projects-page">
    <Heading hideUnderline>Applied Projects</Heading>
    <div className="applied-list-container">
      <AppliedProjectsList />
    </div>
  </div>
);

export default AppliedProjects;
