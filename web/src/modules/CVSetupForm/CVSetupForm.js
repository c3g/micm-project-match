import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './cvSetupForm.scss';
import Dropzone from 'Src/modules/Dropzone';

const CVSetupForm = props => (
  <div className="cv-setup-form">
    <Dropzone
      onDrop={acceptedFiles =>
        props.onSubmitCV({
          redirect: '/',
          cv: acceptedFiles && acceptedFiles[0]
        })
      }
      text={
        props.isLoading
          ? 'Uploading...'
          : "Drag 'n' drop your CV here, or click to select it"
      }
    />
  </div>
);

CVSetupForm.propTypes = {
  onSubmitCV: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default withRouter(CVSetupForm);
