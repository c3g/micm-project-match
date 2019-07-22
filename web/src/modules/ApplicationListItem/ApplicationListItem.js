import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './applicationList.scss';

const ApplicationListItem = ({
  application,
  projectTitle,
  firstName,
  lastName
}) => (
  <div className="application-list-item">
    <div className="title">{projectTitle}</div>
    <Link
      to={{
        pathname: '/application-letter',
        state: {
          application,
          projectTitle,
          firstName,
          lastName
        }
      }}
    >
      <div className="view">VIEW</div>
    </Link>
    <div className="name">
      {firstName} {lastName}
    </div>
    <div className="approved">
      {application.approved ? 'Approved' : 'Waiting'}
    </div>
  </div>
);

ApplicationListItem.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    applicantId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    proposal: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired
  }).isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};

export default ApplicationListItem;
