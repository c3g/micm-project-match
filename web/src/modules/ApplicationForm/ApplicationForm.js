import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import getFilename from '@lukeboyle/get-filename-from-path';
import cx from 'classname';
import { checkSizeInMB } from 'Src/utils/file';
import Dropzone from 'Src/modules/Dropzone';
import RoundedButton from 'Src/modules/RoundedButton';
import Heading from 'Src/modules/Heading';
import Checkbox from 'Src/modules/Checkbox';
import Input from 'Src/modules/InputField';
import Alert from 'Src/modules/Alert';
import './applicationForm.scss';

const createApplicationValidate = (values, props) => {
  const errors = {};
  if (values.isMcgillStudent === undefined) errors.isMcgillStudent = 'Required';
  if (values.studyProgram === undefined) errors.studyProgram = 'Required';
  if (values.studyYear === undefined) errors.studyYear = 'Required';
  if (values.graduationYear === undefined) errors.graduationYear = 'Required';
  if (values.transcript === undefined) errors.transcript = 'Required';
  if (values.otherInternships === undefined)
    errors.otherInternships = 'Required';
  return errors;
};

const fieldPropTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

const CheckboxField = ({ input, label, meta: { touched, error } }) => (
  <div
    style={{ height: 100 }}
    className={`ApplicationForm__checkbox flex-row flex-align-center ${
      error && touched ? 'error' : ''
    }`}
  >
    <Checkbox {...input} text={label} />
    <span className="text-danger">{touched && (error && error)}</span>
  </div>
);

CheckboxField.propTypes = fieldPropTypes;

const InputTextField = ({ input, label, meta: { touched, error } }) => (
  <div
    style={{ height: 100 }}
    className={`ApplicationForm__input-field ${
      error && touched ? 'error' : ''
    }`}
  >
    <div className="flex-row flex-align-center">
      <div className="flex-fill">{label}</div>
      <Input className="flex-fill" {...input} />
    </div>
    <span className="text-danger">{touched && (error && error)}</span>
  </div>
);

InputTextField.propTypes = fieldPropTypes;

const InputNumberField = ({ input, label, meta: { touched, error } }) => (
  <div
    style={{ height: 100 }}
    className={`ApplicationForm__year-field ${error && touched ? 'error' : ''}`}
  >
    <div className="flex-row flex-align-center">
      <div className="flex-fill">{label}</div>
      <Input type="number" className="flex-fill" {...input} />
    </div>
    <span className="text-danger">{touched && (error && error)}</span>
  </div>
);

InputNumberField.propTypes = fieldPropTypes;

class ApplicationFormComponent extends Component {
  static propTypes = {
    application: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    applicationForm: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      data: PropTypes.object
    }),
    createApplication: PropTypes.func.isRequired,
    updateApplication: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    onSubmitCV: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    if (props.applicationForm !== state.applicationForm)
      return {
        applicationForm: props.applicationForm,
        applicationFormChanged: true
      };
  }

  constructor(props) {
    super(props);

    this.state = {
      transcript: undefined,
      transcriptMessage: undefined,
      cvMessage: undefined,
      applicationForm: props.applicationForm,
      applicationFormChanged: false
    };
  }

  /* Application properties:
   * - applicantId
   * - isMcgillStudent: from
   * - studyProgram: from
   * - studyYear: from
   * - graduationYear: from
   * - otherInternships: from
   * - transcript
   */

  componentDidMount() {
    const application = this.props.applicationForm.data;

    if (application)
      this.props.initialize({
        isMcgillStudent: application.isMcgillStudent,
        studyProgram: application.studyProgram,
        studyYear: application.studyYear,
        graduationYear: application.graduationYear,
        otherInternships: application.otherInternships,
        transcript: application.transcriptKey
      });
  }

  componentDidUpdate() {
    const application = this.props.applicationForm.data;

    if (this.state.applicationFormChanged && application) {
      this.props.initialize({
        isMcgillStudent: application.isMcgillStudent,
        studyProgram: application.studyProgram,
        studyYear: application.studyYear,
        graduationYear: application.graduationYear,
        otherInternships: application.otherInternships,
        transcript: application.transcriptKey
      });
      this.setState({ applicationFormChanged: false });
    }
  }

  onSubmit = data => {
    const props = this.props;
    const application = props.applicationForm.data;

    if (!application) {
      props.createApplication({
        applicantId: props.id,
        transcript: this.state.transcript,
        ...data
      });
    } else {
      const newApplication = {
        id: application.id,
        ...data
      };
      if (this.state.transcript)
        newApplication.transcript = this.state.transcript;
      else delete newApplication.transcriptKey;
      props.updateApplication(newApplication);
    }
  };

  onDropCV = files => {
    const file = files[0];
    if (checkSizeInMB(file, 8)) {
      this.props.onSubmitCV({ cv: file });
      this.setState({ cvMessage: undefined });
    } else {
      this.setState({ cvMessage: 'File size over 8 MB' });
    }
  };

  onDropTranscript = (files, input) => {
    const file = files[0];
    if (checkSizeInMB(file, 2))
      this.setState({
        transcript: file,
        transcriptMessage: undefined
      });
    else
      this.setState({
        transcriptMessage: 'File size is over 2 MB'
      });

    input.onChange(file);
  };

  render() {
    const props = this.props;
    const { user, applicationForm } = props;
    const isLoading = applicationForm.isLoading;
    const application = applicationForm.data;
    const hasSubmittedApplication = Boolean(application);

    return (
      <div className={cx('ApplicationForm', { isLoading })}>
        <Heading>Summer Scholars Application</Heading>

        {hasSubmittedApplication && (
          <Alert color="warning">
            Your application has already been submitted. You can still modify it
            by submitting this form again.
          </Alert>
        )}

        <div className="form">
          <form onSubmit={props.handleSubmit(this.onSubmit)}>
            <div className="ApplicationForm__fields">
              <div className="flex-row flex-align-center">
                <div className="flex-fill">First name</div>
                <Input className="flex-fill" value={user.firstName} disabled />
              </div>
              <div className="flex-row flex-align-center">
                <div className="flex-fill">Last name</div>
                <Input className="flex-fill" value={user.lastName} disabled />
              </div>
              <div className="application-form__transcript flex-row">
                <div className="flex-fill">CV and cover letter</div>
                <div className="dropzone-container flex-fill">
                  <Dropzone
                    onDrop={this.onDropCV}
                    text={
                      <div>
                        {user.cvKey && (
                          <span className="dropzone__selected-file">
                            {getFilename(user.cvKey)}
                          </span>
                        )}
                        Drag file here, or click to select
                        {this.state.cvMessage && (
                          <React.Fragment>
                            <br />
                            <span className="text-danger">
                              {this.state.cvMessage}
                            </span>
                          </React.Fragment>
                        )}
                      </div>
                    }
                  />
                </div>
              </div>

              <Field
                name="isMcgillStudent"
                label="Are you a McGill student?"
                height={50}
                component={CheckboxField}
              />
              <Field
                name="studyProgram"
                label="Program of study"
                height={150}
                component={InputTextField}
              />
              <Field
                name="studyYear"
                label="Year of study (i.e. Undergraduate Year 3)"
                height={150}
                component={InputTextField}
              />
              <Field
                name="graduationYear"
                label="Graduation year"
                height={150}
                component={InputNumberField}
              />
              <Field
                name="transcript"
                label="Copy of unofficial transcript (2 MB max)"
                height={150}
                component={({ input, label, meta: { touched, error } }) => {
                  const errorMessage = this.state.transcriptMessage || error;

                  return (
                    <div className="application-form__transcript flex-row">
                      <div className="flex-fill">{label}</div>
                      <div className="dropzone-container flex-fill">
                        <Dropzone
                          onDrop={files => this.onDropTranscript(files, input)}
                          text={
                            <div>
                              {(this.state.transcript || application) && (
                                <span className="dropzone__selected-file">
                                  {this.state.transcript
                                    ? this.state.transcript.name
                                    : getFilename(application.transcriptKey)}
                                </span>
                              )}
                              Drag file here, or click to select
                              {errorMessage && (
                                <React.Fragment>
                                  <br />
                                  <span className="text-danger">
                                    {errorMessage}
                                  </span>
                                </React.Fragment>
                              )}
                            </div>
                          }
                        />
                      </div>
                    </div>
                  );
                }}
              />

              <Field
                name="otherInternships"
                label="Have you applied to other summer internship programs?"
                height={50}
                component={CheckboxField}
              />
            </div>
            <Alert color="info">
              Thank you for your interest in the Summer Scholars Program. Only
              ONE online submission is required. Due to the volume of
              applications, only those candidates being considered for the
              internship will be contacted.
            </Alert>
            <div className="right-button">
              <RoundedButton disabled={isLoading}>
                {hasSubmittedApplication
                  ? 'Update Application'
                  : 'Submit Application'}
              </RoundedButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const ApplicationForm = reduxForm({
  form: 'application',
  validate: createApplicationValidate,
  initialValues: {
    isMcgillStudent: false,
    otherInternships: false
  }
})(ApplicationFormComponent);

export default withRouter(ApplicationForm);
