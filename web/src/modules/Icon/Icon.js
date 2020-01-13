import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-fontawesome';
import cx from 'classname';

export default function Icon({ color, className, ...rest }) {
  if (color)
    return (
      <span style={{ color }}>
        <FontAwesomeIcon className={cx('Icon', className)} {...rest} />
      </span>
    );

  return <FontAwesomeIcon className={cx('Icon', className)} {...rest} />;
}

Icon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
};
