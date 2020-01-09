import React from 'react';
import PropTypes from 'prop-types';
import ApplicationDetails from 'Src/modules/ApplicationDetails';
import './applicationDetails.scss';

const ApplicationDetailsContainer = ({
  match: {
    params: { id }
  }
}) => (
  <div className="application-details">
    <ApplicationDetails id={parseInt(id) || undefined} />
  </div>
);

ApplicationDetailsContainer.propTypes = {
  match: PropTypes.object.isRequired
};

export default ApplicationDetailsContainer;
