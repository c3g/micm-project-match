import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Heading from 'Src/modules/Heading';
import RoundedButton from 'Src/modules/RoundedButton';
import './projectDetails.scss';

class ProjectDetails extends Component {
  static propTypes = {
    fetchProject: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      abstract: PropTypes.string.isRequired,
      openForStudents: PropTypes.bool.isRequired,
      authorId: PropTypes.number.isRequired,
      department: PropTypes.string,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    }).isRequired,
    application: PropTypes.object,
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
      <div className="project-details">
        <Heading hideUnderline>{this.props.project.title}</Heading>
        <div className="abstract">{this.props.project.abstract}</div>
        {['firstName', 'lastName', 'email', 'department'].reduce(
          (a, c) => a || Object.keys(this.props.project).includes(c),
          false
        ) && (
          <>
            <div className="sub-heading">Professor Details</div>
            <div className="details">
              {(this.props.project.firstName ||
                this.props.project.lastName) && (
                <div>
                  <span>Name</span>
                  <span className="blue">
                    <Link to={`/user/${this.props.project.authorId}`}>
                      {this.props.project.firstName}
                      &nbsp;
                      {this.props.project.lastName}
                    </Link>
                  </span>
                </div>
              )}
              {this.props.project.email && (
                <div>
                  <span>Email</span>
                  <span>{this.props.project.email}</span>
                </div>
              )}
              {this.props.project.department && (
                <div>
                  <span>Department</span>
                  {this.props.project.department && (
                    <span>{this.props.project.department}</span>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        <div className="sub-heading">Other Details</div>
        <div>
          This project is&nbsp;
          {this.props.project.openForStudents
            ? 'open to both students and professors'
            : 'only open to professors'}
        </div>
        {this.props.userId === this.props.project.authorId ? (
          <div className="apply">
            <Link
              to={{
                pathname: '/update-project',
                state: {
                  project: this.props.project
                }
              }}
            >
              <RoundedButton>Update</RoundedButton>
            </Link>
          </div>
        ) : this.props.application ? (
          <div className="apply">
            <Link
              to={{
                pathname: '/application',
                state: {
                  project: this.props.project,
                  application: this.props.application
                }
              }}
            >
              <RoundedButton>Update Application</RoundedButton>
            </Link>
          </div>
        ) : (
          <div className="apply">
            <Link
              to={{
                pathname: '/application',
                state: {
                  project: this.props.project
                }
              }}
            >
              <RoundedButton>Apply</RoundedButton>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ProjectDetails);
