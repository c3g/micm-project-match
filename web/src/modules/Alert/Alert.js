import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classname';
import './alert.scss';

const Alert = ({ type, children }) => {
  const alertClassName = cx('Alert', type ? `Alert--${type}` : undefined);

  return <div className={alertClassName}>{children}</div>;
};

Alert.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node
};

export default Alert;
