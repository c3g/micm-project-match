import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import './setPasswordForm.scss';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';

const SetPasswordField = ({ input, type, placeholder }) => (
  <InputField {...input} type={type} placeholder={placeholder} />
);

SetPasswordField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

let SetPasswordForm = props => (
  <div className="set-password-form">
    {!props.complete ? (
      <div className="form">
        <form
          onSubmit={props.handleSubmit(data =>
            props.onSetPassword({
              data: { ...data, token: props.token },
              push: props.history.push
            })
          )}
        >
          <Field
            name="password"
            component={SetPasswordField}
            type="password"
            placeholder="Password"
          />
          <div className="centered-button">
            <RoundedButton>Continue</RoundedButton>
          </div>
        </form>
      </div>
    ) : (
      <div className="form-complete">
        <div>Your password has been updated successfully.</div>
        <div className="centered-button">
          <Link to="/signin">
            <RoundedButton>Sign In</RoundedButton>
          </Link>
        </div>
      </div>
    )}
  </div>
);

SetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSetPassword: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired
};

SetPasswordForm = reduxForm({
  form: 'setPassword'
})(SetPasswordForm);

export default withRouter(SetPasswordForm);
