import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'Src/modules/Alert'
import './error-message.scss';

const ErrorMessage = ({ error }) => (
  <Alert color='danger'>
    <h2>{error.message}</h2>
    <pre>
      {error.stack}
    </pre>
  </Alert>
);

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
