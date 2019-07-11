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
      <div className="project-details">
        <Heading hideUnderline>{this.props.project.title}</Heading>
        <div className="abstract">{this.props.project.abstract}</div>
        <div className="sub-heading">Professor Details</div>
        <div className="details">
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
          <div>
            <span>Email</span>
            <span>{this.props.project.email}</span>
          </div>
          <div>
            <span>Department</span>
            <span>{this.props.project.department}</span>
          </div>
        </div>
        <div className="sub-heading">Other Details</div>
        <div>
          This project is&nbsp;
          {this.props.project.openForStudents
            ? 'open to both students and professors'
            : 'only open to professors'}
        </div>
        <div className="apply">
          <Link to={{ pathname: '/application', state: this.props.project }}>
            <RoundedButton>Apply</RoundedButton>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectDetails);
