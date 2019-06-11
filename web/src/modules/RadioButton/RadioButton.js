import React from 'react';
import PropTypes from 'prop-types';
import './radioButton.scss';

const RadioButton = ({ text, input }) => (
  <label className="radio-button">
    {text}
    <input type="radio" {...input} />
    <span className="radio" />
  </label>
);

RadioButton.propTypes = {
  text: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired
};

export default RadioButton;
