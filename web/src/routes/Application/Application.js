import React from 'react';
import PropTypes from 'prop-types';
import ApplicationForm from 'Src/modules/ApplicationForm';
import { Redirect } from 'react-router-dom';
import './application.scss';

const Application = ({ location }) => (
  <div className="application-page">
    <ApplicationForm />
  </div>
);

Application.propTypes = {
  location: PropTypes.object.isRequired
};

export default Application;
