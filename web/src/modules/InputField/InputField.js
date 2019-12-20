import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './inputField.scss';

const InputField = ({ className, ...rest }) => (
  <input className={cx(className, 'input-field')} {...rest} />
);

InputField.propTypes = {
  className: PropTypes.string
};

export default InputField;
