import React from 'react';
import PropTypes from 'prop-types';
import './heading.scss';

const Heading = ({ children }) => <div className="heading">{children}</div>;

Heading.propTypes = {
  children: PropTypes.string.isRequired
};

export default Heading;
