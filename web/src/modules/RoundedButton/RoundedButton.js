import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './roundedButton.scss';

const RoundedButton = ({ children, className, type, ...props }) => (
  <button {...props} className={cx('rounded-button', className, type)}>
    {children}
  </button>
);

RoundedButton.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string
};

export default RoundedButton;
