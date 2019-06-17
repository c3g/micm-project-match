import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './loginForm.scss';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';
import { facebookLogin, googleLogin } from 'Src/config/endpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

const LoginField = ({ input, type, placeholder }) => (
  <InputField {...input} type={type} placeholder={placeholder} />
);

LoginField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

let LoginForm = props => (
  <div className="login-form">
    <a className="facebook-auth-button" href={facebookLogin}>
      <FontAwesomeIcon
        size="1x"
        transform="down-3 grow-10"
        icon={faFacebookF}
      />
      Continue with Facebook
      <FontAwesomeIcon
        size="1x"
        transform="down-3 grow-10"
        icon={faArrowCircleRight}
      />
    </a>
    <a className="google-auth-button" href={googleLogin}>
      <FontAwesomeIcon size="1x" transform="down-3 grow-10" icon={faGoogle} />
      Continue with Google
      <FontAwesomeIcon
        size="1x"
        transform="down-3 grow-10"
        icon={faArrowCircleRight}
      />
    </a>
    <div className="separator">or</div>
    <div className="form">
      <form
        onSubmit={props.handleSubmit(data =>
          props.onLogin({ data, push: props.history.push })
        )}
      >
        <Field
          name="email"
          component={LoginField}
          type="email"
          placeholder="Email"
        />
        <Field
          name="password"
          component={LoginField}
          type="password"
          placeholder="Password"
        />
        <div className="centered-button">
          <RoundedButton>Continue</RoundedButton>
        </div>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default withRouter(LoginForm);
