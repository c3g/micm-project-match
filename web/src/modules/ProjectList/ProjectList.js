import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectListItem from 'Src/modules/ProjectListItem';
import Loader from 'Src/modules/Loader';
import './projectList.scss';

class ProjectList extends Component {
  static propTypes = {
    fetchProjects: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    fetchUserProjects: PropTypes.func.isRequired,
    userProjects: PropTypes.bool,
    clearProjects: PropTypes.func.isRequired,
    clearUserProjects: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    if (this.props.userProjects) this.props.fetchUserProjects();
    else this.props.fetchProjects();
  }

  componentWillUnmount() {
    this.props.clearProjects();
  }

  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <Loader />
        ) : (
          this.props.projects.map((project, i) => (
            <ProjectListItem key={`project_${i}`} project={project} />
          ))
        )}
      </div>
    );
  }
}

export default ProjectList;
