import React from 'react';
import PropTypes from 'prop-types';
import ApplicationPropType from 'Src/propTypes/Application';
import RoundedButton from 'Src/modules/RoundedButton';
import { withRouter, Link, Redirect } from 'react-router-dom';
import './applicationDetails.scss';

const ApplicationDetails = ({
  id,
  applications
}) => {
  const a = applications.find(a => +a.application.id === +id);

  if (!a)
    return <Redirect to="/applications" />;

  const { application, user } = a;

  return (
    <div className="application-details">
      <div>

      </div>
      <div className="right-align">
        <div>By</div>
        <Link className="name" to={`/user/${application.applicantId}`}>
          {user.firstName} {user.lastName}
        </Link>
      </div>
      <div className="proposal">{application.budget}</div>
      <div className="right-button">
        {application.approved ? (
          <div className="button-container">
            <RoundedButton
              onClick={() => {
                disapproveApplication(application.id);
              }}
            >
              Disapprove Application
            </RoundedButton>
          </div>
        ) : (
          <div className="button-container">
            <RoundedButton
              onClick={() => {
                approveApplication(application.id);
              }}
            >
              Approve Application
            </RoundedButton>
          </div>
        )}
      </div>
    </div>
  )
};

ApplicationDetails.propTypes = {
  id: PropTypes.number.isRequired,
  applications: PropTypes.arrayOf(ApplicationPropType)
};

export default withRouter(ApplicationDetails);
