import React from 'react';
import PropTypes from 'prop-types';
import './snackbar.scss';

const Snackbar = props => (
  <div className={`snackbar ${props.message && 'shown'} ${props.type}`}>
    {props.message}
  </div>
);

Snackbar.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
};

export default Snackbar;
