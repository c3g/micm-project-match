import React from 'react';
import PropTypes from 'prop-types';
import ApplicationPropType from 'Src/propTypes/Application';
import getFilename from '@lukeboyle/get-filename-from-path';
import Icon from 'Src/modules/Icon';
import RoundedButton from 'Src/modules/RoundedButton';
import { withRouter, Link, Redirect } from 'react-router-dom';
import './applicationDetails.scss';

const ApplicationDetails = ({
  id,
  applications,
  approveApplication,
  disapproveApplication
}) => {
  const a = applications.find(a => +a.application.id === +id);

  if (!a) return <Redirect to="/applications" />;

  const { application, user } = a;

  return (
    <div className="application-details">
      <div>
        <Link to="/applications" className="application-details-link">
          <Icon name="arrow-left" /> Back to applications
        </Link>
      </div>

      <div className="right-align">
        <div>By</div>
        <Link
          className="name application-details-link"
          to={`/user/${application.applicantId}`}
        >
          {user.firstName} {user.lastName}
        </Link>
      </div>

      <div className="detail-list">
        <div>
          <span>C.V.</span>
          <span>
            <a
              href={`/api/cv/${user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-button-link"
            >
              View {getFilename(user.cvKey)}
            </a>
          </span>
        </div>
        <div>
          <span>Is a McGill student?</span>
          <span>{application.isMcgillStudent ? 'Yes' : 'No'}</span>
        </div>
        <div>
          <span>Study program</span>
          <span>{application.studyProgram}</span>
        </div>
        <div>
          <span>Study year</span>
          <span>{application.studyYear}</span>
        </div>
        <div>
          <span>Graduation year</span>
          <span>{application.graduationYear}</span>
        </div>
        <div>
          <span>Transcript</span>
          <span>
            <a
              href={`/api/application/${application.id}/transcript`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-button-link"
            >
              View {getFilename(application.transcriptKey)}
            </a>
          </span>
        </div>
        <div>
          <span>Has applied to other internships?</span>
          <span>{application.otherInternships ? 'Yes' : 'No'}</span>
        </div>
      </div>

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
  );
};

ApplicationDetails.propTypes = {
  id: PropTypes.number.isRequired,
  applications: PropTypes.arrayOf(ApplicationPropType)
};

export default withRouter(ApplicationDetails);
