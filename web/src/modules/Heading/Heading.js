import React from 'react';
import PropTypes from 'prop-types';
import './heading.scss';

const Heading = ({ children, hideUnderline }) => (
  <div className="Heading">
    <div
      style={hideUnderline ? { borderBottom: 'none' } : {}}
      className="Heading__inner"
    >
      {children}
    </div>
  </div>
);

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  hideUnderline: PropTypes.bool
};

export default Heading;
