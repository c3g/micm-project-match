import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './setPasswordForm.scss';

let SetPasswordForm = props => (
  <div className="set-password-form">
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
          component="input"
          type="password"
          placeholder="Password"
        />
        <br />
        <button>Continue</button>
      </form>
    </div>
  </div>
);

SetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSetPassword: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};

SetPasswordForm = reduxForm({
  form: 'setPassword'
})(SetPasswordForm);

export default withRouter(SetPasswordForm);
