import React from 'react';
import FontAwesomeIcon from 'react-fontawesome';

export default function Icon({ color, ...rest }) {
  if (color)
    return (
      <span style={{ color }}>
        <FontAwesomeIcon {...rest} />
      </span>
    )

  return (
    <FontAwesomeIcon {...rest} />
  )
}
