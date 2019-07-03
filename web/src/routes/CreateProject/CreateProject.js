import React from 'react';
import './createProject.scss';
import Heading from 'Src/modules/Heading';
import CreateProjectForm from 'Src/modules/CreateProjectForm';

const CreateProject = () => (
  <div className="create-project-page">
    <Heading hideUnderline>Create Project</Heading>
    <CreateProjectForm />
  </div>
);

export default CreateProject;
