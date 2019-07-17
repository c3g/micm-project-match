import React from 'react';
import RoundedButton from 'Src/modules/RoundedButton';
import PropTypes from 'prop-types';
import './applicationDetails.scss';

const ApplicationDetails = ({
  passApplication,
  application,
  projectTitle,
  firstName,
  lastName
}) => (
  <div className="application-details">
    <div className="proposal">{application.proposal}</div>
    <div className="name">
      {firstName} {lastName}
    </div>
    <div className="title">{projectTitle}</div>
    <div className="right-button">
      <div
        className="button-container"
        onClick={() => {
          passApplication(application.id);
        }}
      >
        <RoundedButton>Select Applicant</RoundedButton>
      </div>
    </div>
  </div>
);

ApplicationDetails.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    applicantId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    proposal: PropTypes.string.isRequired,
    accepted: PropTypes.bool.isRequired
  }),
  projectTitle: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  passApplication: PropTypes.func.isRequired
};

export default ApplicationDetails;
