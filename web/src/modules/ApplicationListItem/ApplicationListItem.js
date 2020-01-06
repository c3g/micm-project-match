import React from 'react';
import PropTypes from 'prop-types';
import ApplicationPropType from 'Src/propTypes/Application';
import UserPropType from 'Src/propTypes/User';
import { Link } from 'react-router-dom';
import Icon from 'react-fontawesome';
import './applicationListItem.scss';

const ApplicationListItem = ({ data }) => {
  const { application, user } = data;

  return (
    <div className="application-list-item">
      <div>
        <Link to={`/user/${application.applicantId}`} className="name">
          {user.firstName} {user.lastName}
        </Link>
      </div>
      <div>
        <Link
          className="rounded-button primary"
          to={`/application/${application.id}`}
        >
          View <Icon name="arrow-right" />
        </Link>
      </div>
    </div>
  )
};

ApplicationListItem.propTypes = {
  data: PropTypes.shape({
    application: PropTypes.shape({
      id: PropTypes.number.isRequired,
      applicantId: PropTypes.number.isRequired,
      projectId: PropTypes.number.isRequired,
      proposal: PropTypes.string.isRequired,
      approved: PropTypes.bool.isRequired
    }).isRequired,
    user: UserPropType.isRequired
  })
};

export default ApplicationListItem;
