import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './inputField.scss';

const InputField = ({ className, size, ...rest }) => (
  <input
    className={cx(
      className,
      'InputField',
      size ? `InputField--${size}` : undefined
    )}
    {...rest}
  />
);

InputField.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string
};

export default InputField;
