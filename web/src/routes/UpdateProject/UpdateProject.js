import React from 'react';
import Heading from 'Src/modules/Heading';
import CreateProjectForm from 'Src/modules/CreateProjectForm';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './updateProject.scss';

const UpdateProject = ({ location }) => (
  <div className="update-project-page">
    {location && location.state && location.state.project ? (
      <>
        <Heading hideUnderline>Update Project</Heading>
        <CreateProjectForm project={location.state.project} />
      </>
    ) : (
      <Redirect to="/" />
    )}
  </div>
);

UpdateProject.propTypes = {
  location: PropTypes.object.isRequired
};

export default UpdateProject;
