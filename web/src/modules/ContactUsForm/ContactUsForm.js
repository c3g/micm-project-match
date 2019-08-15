import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import TextArea from 'Src/modules/TextArea';
import InputField from 'Src/modules/InputField';
import './contactUsForm.scss';

const contactUsFormValidate = values => {
  const errors = {};
  if (!values.name) errors.proposal = 'Required';
  if (!values.email) errors.proposal = 'Required';
  if (!values.message) errors.proposal = 'Required';
  return errors;
};

let ContactUsTextArea = ({
  input,
  height,
  label,
  meta: { touched, error }
}) => (
  <div
    style={{ height: height || 150 }}
    className={`contact-us-text-area ${error && touched ? 'error' : ''}`}
  >
    <TextArea {...input} placeholder={label} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

ContactUsTextArea.propTypes = {
  height: PropTypes.number,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  application: PropTypes.object,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

let ContactUsField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`contact-us-field ${error && touched ? 'error' : ''}`}>
    <InputField {...input} placeholder={label} type={type} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

ContactUsField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

class ContactUsFormComponent extends Component {
  render() {
    const props = this.props;
    return (
      <div className="contact-form">
        <form onSubmit={props.handleSubmit}>
          <Field name="name" label="Name" component={ContactUsField} />
          <Field name="email" label="Email" component={ContactUsField} />
          <Field
            name="message"
            label="Message"
            height={200}
            component={ContactUsTextArea}
          />
          <button className="send-button">Send</button>
        </form>
      </div>
    );
  }
}

const ContactUsForm = reduxForm({
  form: 'contactUs',
  validate: contactUsFormValidate
})(ContactUsFormComponent);

export default ContactUsForm;
