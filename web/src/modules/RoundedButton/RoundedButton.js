import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './roundedButton.scss';

const RoundedButton = ({ children, className, color, ...props }) => (
  <button {...props} className={cx('rounded-button', className, color)}>
    {children}
  </button>
);

RoundedButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string
};

export default RoundedButton;
