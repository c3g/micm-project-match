import React from 'react';
import PropTypes from 'prop-types';
import './heading.scss';

const Heading = ({ children, hideUnderline }) => (
  <div
    style={hideUnderline ? { borderBottom: 'none' } : {}}
    className="heading"
  >
    {children}
  </div>
);

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  hideUnderline: PropTypes.bool
};

export default Heading;
