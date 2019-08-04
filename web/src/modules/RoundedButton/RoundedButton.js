import React from 'react';
import PropTypes from 'prop-types';
import './roundedButton.scss';

const RoundedButton = ({ children, ...props }) => (
  <button {...props} className="rounded-button">
    {children}
  </button>
);

RoundedButton.propTypes = {
  children: PropTypes.string.isRequired
};

export default RoundedButton;
