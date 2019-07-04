import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from 'Src/modules/ProjectListItem';
import './projectList.scss';

class ProjectList extends Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <div>
        {this.props.projects.map((project, i) => (
          <ProjectListItem key={`project_${i}`} project={project} />
        ))}
      </div>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
};

export default ProjectList;
