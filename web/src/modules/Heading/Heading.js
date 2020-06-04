import React from 'react';
import PropTypes from 'prop-types';
import './heading.scss';

const Heading = ({ children, hideUnderline, extra }) => (
  <div className="Heading">
    <div
      style={hideUnderline ? { borderBottom: 'none' } : {}}
      className="Heading__inner"
    >
      {children}
    </div>
    <div className="flex-fill" />
    {extra}
  </div>
);

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  extra: PropTypes.any,
  hideUnderline: PropTypes.bool
};

export default Heading;
