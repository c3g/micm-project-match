import React from 'react';
import PropTypes from 'prop-types';
import ApplicationForm from 'Src/modules/ApplicationForm';
import { Redirect } from 'react-router-dom';
import './application.scss';

const Application = ({ location }) => (
  <div className="application-page">
    {location && location.state && location.state.id ? (
      <ApplicationForm project={location.state} />
    ) : (
      <Redirect to="/" />
    )}
  </div>
);

Application.propTypes = {
  location: PropTypes.object.isRequired
};

export default Application;
