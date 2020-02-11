import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'Src/modules/Icon';
import './snackbar.scss';

const Snackbar = props => (
  <div className={`Snackbar ${props.shown ? 'shown' : ''} ${props.type}`}>
    {props.message}

    <button className='Snackbar__hide' onClick={props.hide}>
      <Icon name="close" />
    </button>
  </div>
);

Snackbar.propTypes = {
  hide: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  message: PropTypes.string,
  type: PropTypes.string
};

export default Snackbar;
