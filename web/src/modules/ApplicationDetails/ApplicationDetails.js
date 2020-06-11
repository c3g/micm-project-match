import React from 'react';
import PropTypes from 'prop-types';
import ApplicationPropType from 'Src/propTypes/Application';
import getFilename from '@lukeboyle/get-filename-from-path';
import { pdfFromApplication } from 'Src/utils/pdf';
import Loader from 'Src/modules/Loader';
import Icon from 'Src/modules/Icon';
import Button from 'Src/modules/Button';
import { withRouter, Link } from 'react-router-dom';
import './applicationDetails.scss';

const saveAsPDF = a => {
  const filename = `application-${a.user.firstName}_${a.user.lastName}.pdf`;
  const pdf = pdfFromApplication(a);
  pdf.set({ filename }).save();
};

const ApplicationDetails = ({
  id,
  isLoading,
  applications,
  fetchApplications,
  approveApplication,
  disapproveApplication
}) => {
  const a = applications.find(a => +a.application.id === +id);

  if (!a && applications.length === 0) {
    if (!isLoading) fetchApplications();

    return <Loader />;
  }

  const { application, user } = a;

  return (
    <div className="application-details">
      <div className="flex-row">
        <Link to="/applications" className="application-details-link">
          <Icon name="arrow-left" /> Back to applications
        </Link>
        <div className="flex-fill" />
        <Button onClick={() => saveAsPDF(a)}>
          Export as PDF
        </Button>
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
              href={`/api/user/cv/${user.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link"
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
          <span>University</span>
          <span>
            {application.isMcgillStudent ? 'McGill' : application.university}
          </span>
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
              className="button-link"
            >
              View {getFilename(application.transcriptKey)}
            </a>
          </span>
        </div>
        <div>
          <span>Has applied to other internships?</span>
          <span>{application.otherInternships ? 'Yes' : 'No'}</span>
        </div>
        <div>
          <span>Other internships details</span>
          <span>{application.otherInternshipsDetails}</span>
        </div>
      </div>

      <div className="right-button">
        {application.approved ? (
          <div className="button-container">
            <Button
              onClick={() => {
                disapproveApplication(application.id);
              }}
            >
              Disapprove Application
            </Button>
          </div>
        ) : (
          <div className="button-container">
            <Button
              onClick={() => {
                approveApplication(application.id);
              }}
            >
              Approve Application
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

ApplicationDetails.propTypes = {
  id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  applications: PropTypes.arrayOf(ApplicationPropType),
  fetchApplications: PropTypes.func.isRequired,
  approveApplication: PropTypes.func.isRequired,
  disapproveApplication: PropTypes.func.isRequired
};

export default withRouter(ApplicationDetails);
