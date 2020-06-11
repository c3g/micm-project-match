import React from 'react';
import ApplicationPropType from 'Src/propTypes/Application';
import { Link } from 'react-router-dom';
import Icon from 'react-fontawesome';
import './applicationListItem.scss';

const ApplicationListItem = ({ data }) => {
  const { application, user } = data;

  return (
    <div className="application-list-item">
      <div className="flex-row flex-align-center">
        <Link to={`/user/${application.applicantId}`} className="name">
          {user.firstName} {user.lastName}
        </Link>
      </div>
      <div className="flex-row flex-align-center">
        <span className="text-muted flex-item-rmargin">
          {application.approved ? 'Approved' : 'Not approved'}
        </span>
        <Link
          className="button secondary"
          to={`/applications/${application.id}`}
        >
          View <Icon name="arrow-right" />
        </Link>
      </div>
    </div>
  );
};

ApplicationListItem.propTypes = {
  data: ApplicationPropType
};

export default ApplicationListItem;
