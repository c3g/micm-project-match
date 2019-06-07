import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Captcha from 'Src/modules/Captcha';
import './registerForm.scss';

const registerValidate = values => {
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

let RegisterField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    <span className="error">{touched && (error && error)}</span>
  </div>
);

RegisterField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

let RegisterForm = props => (
  <div className="register-form">
    <div className="form">
      <form
        onSubmit={props.handleSubmit(data =>
          props.onRegister({ data, push: props.history.push })
        )}
      >
        <Field
          name="firstName"
          component={RegisterField}
          type="text"
          label="First Name"
        />
        <Field
          name="lastName"
          component={RegisterField}
          type="text"
          label="Last Name"
        />
        <Field
          name="email"
          component={RegisterField}
          type="email"
          label="Email"
        />
        <Field
          name="tel"
          component={RegisterField}
          type="text"
          label="Contact Number"
        />
        <Field
          name="type"
          component="input"
          type="radio"
          value="STUDENT"
          checked
        />
        Student
        <Field name="type" component="input" type="radio" value="PROFESSOR" />
        Professor
        <Field name="captchaResponse" component={Captcha} />
        <button>Continue</button>
      </form>
    </div>
  </div>
);

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

RegisterForm = reduxForm({
  form: 'register',
  validate: registerValidate
})(RegisterForm);

export default withRouter(RegisterForm);
