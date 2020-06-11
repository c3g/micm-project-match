import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserPropTypes from 'Src/propTypes/User';
import Button from 'Src/modules/Button';
import InputField from 'Src/modules/InputField';
import RadioButton from 'Src/modules/RadioButton';
import { equals, pick, pickBy } from 'ramda';
import { name } from 'Src/utils';
import './setupForm.scss';

const setupValidate = values => {
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

let SetupField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`setup-field ${error && touched ? 'error' : ''}`}>
    <InputField {...input} placeholder={label} type={type} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

SetupField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

class SetupFormComponent extends Component {
  state = { firstName: '', lastName: '', email: '', tel: '', type: '' };

  componentDidMount() {
    if (this.props.userData.verified) this.props.history.push('/');
    this.props.fetchOAuthData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const oAuthData = pick(['firstName', 'lastName', 'email'], nextProps.oauth);
    const userData = pickBy(v => v && v !== 'UNSET', nextProps.userData);
    const newProps = { ...prevState, ...oAuthData, ...userData };
    if (!equals(newProps, prevState)) {
      nextProps.initialize(newProps);
      if (userData.firstName && userData.lastName && userData.email)
        nextProps.onFormFilled();
    }
    return newProps;
  }

  render() {
    const props = this.props;
    return (
      <div className="setup-form">
        {!props.complete ? (
          <div className="form">
            <div className="note">
              <div>Hey{name(this.state.firstName)},</div>
              Let&apos;s get your profile set up. Please make sure you provide a
              McGill email. We will send you a verification email before you can
              start with your projects.
            </div>
            <form
              onSubmit={props.handleSubmit(data =>
                props.onSetup({ data, push: props.history.push })
              )}
            >
              First Name
              <Field
                name="firstName"
                component={SetupField}
                type="text"
                label="First Name"
              />
              Last Name
              <Field
                name="lastName"
                component={SetupField}
                type="text"
                label="Last Name"
              />
              Email
              <Field
                name="email"
                component={SetupField}
                type="email"
                label="Email"
              />
              Contact Number
              <Field
                name="tel"
                component={SetupField}
                type="text"
                label="Contact Number"
              />
              <Field
                name="type"
                text="I'm a Student"
                component={RadioButton}
                type="radio"
                value="STUDENT"
              />
              <Field
                name="type"
                text="I'm a Professor"
                component={RadioButton}
                type="radio"
                value="PROFESSOR"
              />
              <div className="centered-button">
                <Button>Continue</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="form-complete">
            <div className="note">
              We&apos;ve sent a verification email to {this.state.email}. Follow
              it to verify your email. Incase you didn&apos;t get the email or
              filled it wrong, you can change it by clicking Refill Details.
            </div>
            <div className="centered-button">
              <div>
                <Button onClick={() => props.onRefillForm()}>
                  Refill Details
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

SetupFormComponent.propTypes = {
  complete: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSetup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onRefillForm: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  fetchOAuthData: PropTypes.func.isRequired,
  onFormFilled: PropTypes.func.isRequired,
  oauth: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  userData: UserPropTypes.isRequired
};

const SetupForm = reduxForm({
  form: 'setup',
  validate: setupValidate
})(SetupFormComponent);

export default withRouter(SetupForm);
