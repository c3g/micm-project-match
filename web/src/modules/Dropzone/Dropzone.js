import React from 'react';
import ReactDropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import './dropzone.scss';

const Dropzone = ({ onDrop, text }) => (
  <ReactDropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
    {({ getRootProps, getInputProps }) => (
      <div className="dropzone" role="button" {...getRootProps()}>
        <input {...getInputProps()} />
        <div>{text}</div>
      </div>
    )}
  </ReactDropzone>
);

Dropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Dropzone;
