import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './alert.scss';

const Alert = ({ color, children }) => {
  const alertClassName = cx('Alert', color ? `Alert--${color}` : undefined);

  return <div className={alertClassName}>{children}</div>;
};

Alert.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node
};

export default Alert;
