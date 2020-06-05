import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './inputField.scss';

const InputField = React.forwardRef(({ className, size, ...rest }, ref) => (
  <input
    ref={ref}
    className={cx(
      className,
      'InputField',
      size ? `InputField--${size}` : undefined
    )}
    {...rest}
  />
));

InputField.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string
};

export default InputField;
