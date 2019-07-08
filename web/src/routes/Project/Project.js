import React from 'react';
import ProjectDetails from 'Src/modules/ProjectDetails';
import PropTypes from 'prop-types';
import './project.scss';

const Project = ({
  match: {
    params: { id }
  }
}) => (
  <div className="project-page">
    <ProjectDetails id={id} />
  </div>
);

Project.propTypes = {
  match: PropTypes.object.isRequired
};

export default Project;
