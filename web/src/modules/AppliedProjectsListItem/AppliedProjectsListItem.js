import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    <div>
      <div>
        <Link to={`/project/${projectId}`} className="title">
          {projectTitle}
        </Link>
      </div>
      <div>
        By&nbsp;
        <Link to={`/user/${authorId}`} className="name">
          {firstName} {lastName}
        </Link>
      </div>
    </div>
    <div>
      <div className="status">
        {application.approved ? 'Approved' : 'Waiting'}
      </div>
      <div>
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
          className="button"
        >
          Update
        </Link>
        {application.approved && (
          <button className="button" onClick={claimProject}>
            Claim
          </button>
        )}
      </div>
    </div>
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
