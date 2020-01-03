import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import getFilename from '@lukeboyle/get-filename-from-path';
import { checkSizeInMB } from 'Src/utils/file';
import Dropzone from 'Src/modules/Dropzone';
import RoundedButton from 'Src/modules/RoundedButton';
import Heading from 'Src/modules/Heading';
import Checkbox from 'Src/modules/Checkbox';
import Input from 'Src/modules/InputField';
import './applicationForm.scss';

const createApplicationValidate = values => {
  const errors = {};
  if (values.isMcgillStudent === undefined) errors.isMcgillStudent = 'Required';
  if (values.program === undefined) errors.program = 'Required';
  if (values.year === undefined) errors.year = 'Required';
  if (values.transcriptKey === undefined) errors.transcriptKey = 'Required';
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
    className={`create-application__checkbox flex-row flex-align-center ${
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
    className={`create-application__input-field ${
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
    className={`create-application__year-field ${
      error && touched ? 'error' : ''
    }`}
  >
    <div className="flex-row flex-align-center">
      <div className="flex-fill">{label}</div>
      <Input type="number" className="flex-fill" {...input} />
    </div>
    <span className="text-danger">{touched && (error && error)}</span>
  </div>
);

InputNumberField.propTypes = fieldPropTypes;

let FileField = ({ input, label, meta: { touched, error } }) => (
  <div
    style={{ height: 100 }}
    className={`create-application__year-field ${
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

FileField.propTypes = fieldPropTypes;

class ApplicationFormComponent extends Component {
  static propTypes = {
    application: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createApplication: PropTypes.func.isRequired,
    updateApplication: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    onSubmitCV: PropTypes.func.isRequired
  };

  state = {
    transcript: undefined,
    transcriptMessage: undefined,
    cvMessage: undefined
  };

  componentDidMount() {
    // TODO(fix application initialization & state handling)
    if (this.props.application)
      this.props.initialize({ proposal: this.props.application.proposal });
  }

  render() {
    const props = this.props;
    const { user } = props;

    return (
      <div className="application-form">
        <Heading>Summer Scholars Application</Heading>
        <div className="form">
          <form
            onSubmit={props.handleSubmit(data =>
              props.application
                ? props.updateApplication({
                    data: { ...data, applicationId: props.application.id },
                    push: props.history.push
                  })
                : props.createApplication({
                    data: {
                      ...data,
                      applicantId: props.id
                    },
                    push: props.history.push
                  })
            )}
          >
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
                  onDrop={files => {
                    const file = files[0];
                    if (checkSizeInMB(file, 8)) {
                      this.props.onSubmitCV({ cv: file });
                      this.setState({ cvMessage: undefined });
                    } else {
                      this.setState({ cvMessage: 'File size over 8 MB' });
                    }
                  }}
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
            <div className="application-form__transcript flex-row">
              <div className="flex-fill">
                Copy of unofficial transcript (2 MB max)
              </div>
              <div className="dropzone-container flex-fill">
                <Dropzone
                  onDrop={files => {
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
                  }}
                  text={
                    <div>
                      {this.state.transcript && (
                        <span className="dropzone__selected-file">
                          {this.state.transcript.name}
                        </span>
                      )}
                      Drag file here, or click to select
                      {this.state.transcriptMessage && (
                        <React.Fragment>
                          <br />
                          <span className="text-danger">
                            {this.state.transcriptMessage}
                          </span>
                        </React.Fragment>
                      )}
                    </div>
                  }
                />
              </div>
            </div>
            <Field
              name="otherInternships"
              label="Have you applied to other summer internship programs?"
              height={50}
              component={CheckboxField}
            />
            <Alert color="info">
              Thank you for your interest in the Summer Scholars Program. Only
              ONE online submission is required. Due to the volume of
              applications, only those candidates being considered for the
              internship will be contacted.
            </Alert>
            <div className="right-button">
              <RoundedButton>Submit Application</RoundedButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const ApplicationForm = reduxForm({
  form: 'application',
  validate: createApplicationValidate
})(ApplicationFormComponent);

export default withRouter(ApplicationForm);
