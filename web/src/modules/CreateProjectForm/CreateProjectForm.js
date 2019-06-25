import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';
import TextArea from 'Src/modules/TextArea';
import './createProjectForm.scss';

const createProjectValidate = values => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Invalid email address';

  if (!values.firstName) errors.firstName = 'Required';
  else if (values.firstName.length > 50)
    errors.firstName = 'Must be less than 50 characters long';

  if (!values.lastName) errors.lastName = 'Required';
  else if (values.lastName.length > 50)
    errors.lastName = 'Must be less than 50 characters long';

  return errors;
};

let CreateProjectTextArea = ({
  input,
  height,
  label,
  meta: { touched, error }
}) => (
  <div
    style={{ height: height || 150 }}
    className={`create-project-text-area ${error && touched ? 'error' : ''}`}
  >
    <TextArea {...input} placeholder={label} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectTextArea.propTypes = {
  height: PropTypes.number,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

let CreateProjectField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`create-project-field ${error && touched ? 'error' : ''}`}>
    <InputField {...input} placeholder={label} type={type} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

class CreateProjectFormComponent extends Component {
  render() {
    const props = this.props;
    return (
      <div className="create-project-form">
        <div className="form">
          <form
            onSubmit={props.handleSubmit(data =>
              props.onCreateProject({ data, push: props.history.push })
            )}
          >
            <div>
              Project Title
              <Field name="title" component={CreateProjectField} type="text" />
            </div>
            <div className="row">
              <div className="half-width">
                Prefered project start date
                <Field
                  name="startDate"
                  component={CreateProjectField}
                  type="date"
                />
              </div>
              <div className="half-width">
                MiCM Axis
                <Field name="axis" component={CreateProjectField} type="text" />
              </div>
            </div>
            <div>
              High level abstract
              <Field name="abstract" component={CreateProjectTextArea} />
            </div>
            <div>
              Project description
              <Field
                height={300}
                name="description"
                component={CreateProjectTextArea}
              />
            </div>
            <div>
              Description of datasets to be used or generated (collaborations
              for study design are also encouraged)
              <Field name="datasets" component={CreateProjectTextArea} />
            </div>
            <div>
              Explain why you see this as a collaborative research project and
              what you hope to gain from the collaboration. Highlight any
              potential of the proposed work to progress to other funding
              competition.
              <Field name="motive" component={CreateProjectTextArea} />
            </div>
            <div className="row">
              <div className="half-width">
                Expected project timeframe
                <Field
                  name="timeframe"
                  component={CreateProjectField}
                  type="text"
                />
              </div>
              <div className="half-width">
                Can students apply for this project?
                <Field name="open" component={CreateProjectField} type="text" />
              </div>
            </div>
            <div className="right-button">
              <RoundedButton>Apply Now</RoundedButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateProjectFormComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const CreateProjectForm = reduxForm({
  form: 'createProject',
  validate: createProjectValidate
})(CreateProjectFormComponent);

export default withRouter(CreateProjectForm);
