import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';
import captchaConfig from 'Src/config/recaptcha';

let Captcha = props => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ReCAPTCHA
      sitekey={captchaConfig.sitekey}
      onChange={props.input.onChange}
    />
  </div>
);

Captcha.propTypes = {
  input: PropTypes.object.isRequired
};

export default Captcha;
