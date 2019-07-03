import React from 'react';
import './discover.scss';
import Heading from 'Src/modules/Heading';
import ProjectSearchbar from 'Src/modules/ProjectSearchbar';

const ProfessorSetup = () => (
  <div className="discover-page">
    <Heading hideUnderline>Discover Projects</Heading>
    <ProjectSearchbar />
  </div>
);

export default ProfessorSetup;
