import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './professorSetupForm.scss';
import Button from 'Src/modules/Button';
import Checkbox from 'Src/modules/Checkbox';
import InputField from 'Src/modules/InputField';

const InputFormField = ({ input, type, placeholder, disabled }) => (
  <InputField
    {...input}
    type={type}
    placeholder={placeholder}
    disabled={disabled}
  />
);

const CheckboxFormField = ({ input, label, meta: { touched, error } }) => (
  <div
    className={`flex-row flex-align-center ${error && touched ? 'error' : ''}`}
  >
    <Checkbox {...input} text={label} />
    <span className="text-danger">{touched && (error && error)}</span>
  </div>
);

const fieldPropTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

CheckboxFormField.propTypes = fieldPropTypes;

InputFormField.propTypes = fieldPropTypes;

const mapStateToProps = state => ({
  formData: state.form.professorSetup
});

const ProfessorSetupForm = props => (
  <div className="professor-setup-form">
    <div className="form">
      <form
        onSubmit={props.handleSubmit(data =>
          props.onSetProfessorDetails({ data })
        )}
      >
        <Field
          name="department"
          component={InputFormField}
          type="text"
          placeholder="Department"
        />
        <Field
          name="position"
          component={InputFormField}
          type="text"
          placeholder="Position"
        />
        <Field
          name="mila"
          component={CheckboxFormField}
          type="checkbox"
          label="Are you affiliated with Mila?"
        />
        <Field
          name="university"
          component={InputFormField}
          type="text"
          placeholder="University"
          disabled={props.formData ? !props.formData.values.mila : false}
        />
        <div className="centered-button">
          <Button>Continue</Button>
        </div>
      </form>
    </div>
  </div>
);

ProfessorSetupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSetProfessorDetails: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'professorSetup',
  initialValues: {
    mila: false
  }
})(connect(mapStateToProps)(ProfessorSetupForm));
