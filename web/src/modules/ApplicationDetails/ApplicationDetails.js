import React from 'react';
import RoundedButton from 'Src/modules/RoundedButton';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './applicationDetails.scss';

const ApplicationDetails = ({
  approveApplication,
  disapproveApplication,
  application,
  projectTitle,
  firstName,
  lastName,
  history
}) => (
  <div className="application-details">
    <div className="proposal">{application.proposal}</div>
    <div className="name">
      {firstName} {lastName}
    </div>
    <div className="title">{projectTitle}</div>
    <div className="right-button">
      {application.approved ? (
        <div className="button-container">
          <RoundedButton
            onClick={() => {
              disapproveApplication({
                applicationId: application.id,
                push: history.push
              });
            }}
          >
            Disapprove Application
          </RoundedButton>
        </div>
      ) : (
        <div className="button-container">
          <RoundedButton
            onClick={() => {
              approveApplication({
                applicationId: application.id,
                push: history.push
              });
            }}
          >
            Approve Application
          </RoundedButton>
        </div>
      )}
    </div>
  </div>
);

ApplicationDetails.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.number.isRequired,
    applicantId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    proposal: PropTypes.string.isRequired,
    approved: PropTypes.bool.isRequired
  }),
  projectTitle: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  approveApplication: PropTypes.func.isRequired,
  disapproveApplication: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(ApplicationDetails);
