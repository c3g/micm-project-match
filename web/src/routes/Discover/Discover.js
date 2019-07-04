import React from 'react';
import './discover.scss';
import Heading from 'Src/modules/Heading';
import ProjectSearchbar from 'Src/modules/ProjectSearchbar';
import ProjectList from 'Src/modules/ProjectList';

const ProfessorSetup = () => (
  <div className="discover-page">
    <Heading hideUnderline>Discover Projects</Heading>
    <ProjectSearchbar />
    <ProjectList />
  </div>
);

export default ProfessorSetup;
