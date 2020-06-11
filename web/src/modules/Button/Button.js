import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './button.scss';

const Button = ({ children, className, color, ...props }) => (
  <button {...props} className={cx('button', className, color)}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string
};

Button.defaultProps = {
  color: 'primary'
};

export default Button;
