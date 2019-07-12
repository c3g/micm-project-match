import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoundedButton from 'Src/modules/RoundedButton';
import Heading from 'Src/modules/Heading';
import TextArea from 'Src/modules/TextArea';
import './applicationForm.scss';

const createApplicationValidate = values => {
  const errors = {};
  if (!values.proposal) errors.proposal = 'Required';
  return errors;
};

let CreateApplicationTextArea = ({
  input,
  height,
  label,
  meta: { touched, error }
}) => (
  <div
    style={{ height: height || 150 }}
    className={`create-application-text-area ${
      error && touched ? 'error' : ''
    }`}
  >
    <TextArea {...input} placeholder={label} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateApplicationTextArea.propTypes = {
  height: PropTypes.number,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  application: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

class ApplicationFormComponent extends Component {
  static propTypes = {
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired,
    application: PropTypes.shape({
      id: PropTypes.number.isRequired,
      proposal: PropTypes.string.isRequired
    }),
    id: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createApplication: PropTypes.func.isRequired,
    updateApplication: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.application)
      this.props.initialize({ proposal: this.props.application.proposal });
  }

  render() {
    const props = this.props;
    return (
      <div className="application-form">
        {props.project.title && (
          <Heading hideUnderline>{props.project.title}</Heading>
        )}
        <div className="form">
          <form
            onSubmit={props.handleSubmit(data =>
              props.application
                ? props.updateApplication({
                    data: { ...data, applicationId: props.application.id },
                    projectId: props.project.id,
                    push: props.history.push
                  })
                : props.createApplication({
                    data: {
                      ...data,
                      projectId: props.project.id,
                      applicantId: props.id
                    },
                    push: props.history.push
                  })
            )}
          >
            <div>
              Submit your applicaion letter
              <Field
                name="proposal"
                label="Type it out here..."
                height={400}
                component={CreateApplicationTextArea}
              />
            </div>
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
  form: 'createProject',
  validate: createApplicationValidate
})(ApplicationFormComponent);

export default withRouter(ApplicationForm);
