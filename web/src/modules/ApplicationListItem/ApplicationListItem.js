import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './applicationListItem.scss';

const ApplicationListItem = ({
  application,
  projectTitle,
  firstName,
  lastName,
  chosenId
}) => (
  <div className="application-list-item">
    <div>
      <Link to={`/user/${application.applicantId}`} className="name">
        {firstName} {lastName}
      </Link>
      <Link to={`/project/${application.projectId}`} className="title">
        {projectTitle}
      </Link>
    </div>
    <div>
      <div className="approved">
        {chosenId
          ? chosenId === application.applicantId
            ? 'Claimed'
            : 'Approved'
          : application.approved
          ? 'Approved'
          : 'Waiting'}
      </div>
      <Link
        to={{
          pathname: '/application-letter',
          state: {
            chosenId,
            application,
            projectTitle,
            firstName,
            lastName,
            projectId: application.projectId,
            applicantId: application.applicantId
          }
        }}
        className="view"
      >
        View &nbsp; <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  </div>
);

ApplicationListItem.propTypes = {
  projectTitle: PropTypes.string.isRequired,
  chosenId: PropTypes.number,
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
