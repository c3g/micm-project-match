import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ProjectDetails extends Component {
  static propTypes = {
    fetchProject: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      abstract: PropTypes.string.isRequired,
      openForStudents: PropTypes.bool.isRequired,
      authorId: PropTypes.number.isRequired,
      department: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const {
      history: { push },
      id
    } = this.props;
    this.props.fetchProject({ push, id });
  }

  render() {
    return (
      <div>
        <div>{this.props.project.title}</div>
        <div>{this.props.project.abstract}</div>
        <div>{this.props.project.department}</div>
        <div>{this.props.project.email}</div>
        <div>{this.props.project.firstName}</div>
        <div>{this.props.project.lastName}</div>
        <div>{this.props.project.openForStudents}</div>
      </div>
    );
  }
}

export default withRouter(ProjectDetails);
