import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ApplicationDetails from 'Src/modules/ApplicationDetails';
import './applicationLetter.scss';

const ApplicationLetter = ({ location }) => (
  <div className="application-letter-page">
    {location && location.state ? (
      <ApplicationDetails {...location.state} />
    ) : (
      <Redirect to="/applications" />
    )}
  </div>
);

ApplicationLetter.propTypes = {
  location: PropTypes.object.isRequired
};

export default ApplicationLetter;
