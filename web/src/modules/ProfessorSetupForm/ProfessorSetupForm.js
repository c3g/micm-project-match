import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './professorSetupForm.scss';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';

const ProfessorSetupField = ({ input, type, placeholder }) => (
  <InputField {...input} type={type} placeholder={placeholder} />
);

ProfessorSetupField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

let ProfessorSetupForm = props => (
  <div className="professor-setup-form">
    <div className="form">
      <form
        onSubmit={props.handleSubmit(data =>
          props.onSetProfessorDetails({
            data,
            push: props.history.push
          })
        )}
      >
        <Field
          name="department"
          component={ProfessorSetupField}
          type="text"
          placeholder="Department"
        />
        <Field
          name="position"
          component={ProfessorSetupField}
          type="text"
          placeholder="Position"
        />
        <div className="centered-button">
          <RoundedButton>Continue</RoundedButton>
        </div>
      </form>
    </div>
  </div>
);

ProfessorSetupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSetProfessorDetails: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

ProfessorSetupForm = reduxForm({
  form: 'professorSetup'
})(ProfessorSetupForm);

export default withRouter(ProfessorSetupForm);
