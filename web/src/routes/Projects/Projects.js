import React from 'react';
import Heading from 'Src/modules/Heading';
import ProjectList from 'Src/modules/ProjectList';
import './projects.scss';

const Projects = () => (
  <div className="projects-page">
    <Heading hideUnderline>My Projects</Heading>
    <ProjectList userProjects />
  </div>
);

export default Projects;
