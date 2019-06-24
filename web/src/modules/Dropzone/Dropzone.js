import React from 'react';
import ReactDropzone from 'react-dropzone';
import PropTypes from 'prop-types';

const Dropzone = ({ onDrop }) => (
  <ReactDropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
    )}
  </ReactDropzone>
);

Dropzone.propTypes = {
  onDrop: PropTypes.func.isRequired
};

export default Dropzone;
