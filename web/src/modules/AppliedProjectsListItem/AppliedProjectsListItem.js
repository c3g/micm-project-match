import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RoundedButton from 'Src/modules/RoundedButton';
import './appliedProjectsListItem.scss';

const AppliedProjectListItem = ({
  application,
  authorId,
  firstName,
  lastName,
  projectId,
  projectTitle,
  claimProject
}) => (
  <div className="applied-projects-list-item">
    <Link to={`/project/${projectId}`} className="title">
      {projectTitle}
    </Link>
    <Link to={`/user/${authorId}`} className="name">
      {firstName} {lastName}
    </Link>
    <Link
      to={{
        pathname: '/application',
        state: {
          project: {
            id: projectId,
            title: projectTitle
          },
          application: application
        }
      }}
    >
      <div className="view">Update Application</div>
    </Link>
    {application.approved ? 'Approved' : 'Waiting'}
    {application.approved && (
      <RoundedButton onClick={claimProject}>Claim</RoundedButton>
    )}
  </div>
);

AppliedProjectListItem.propTypes = {
  application: PropTypes.shape({
    applicantId: PropTypes.number.isRequired,
    approved: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    proposal: PropTypes.string.isRequired
  }).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  projectTitle: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  claimProject: PropTypes.func.isRequired
};

export default AppliedProjectListItem;
