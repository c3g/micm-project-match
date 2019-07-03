import React from 'react';
import PropTypes from 'prop-types';
import RoundedInputField from 'Src/modules/RoundedInputField';
import { Field, reduxForm } from 'redux-form';

const ProjectSearchbarField = ({ input, type, placeholder }) => (
  <RoundedInputField {...input} type={type} placeholder={placeholder} />
);

ProjectSearchbarField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired
};

let ProjectSearchbar = props => (
  <div className="project-searchbar">
    <form onSubmit={props.handleSubmit}>
      <Field
        component={ProjectSearchbarField}
        type="text"
        placeholder="Search..."
        name="search"
      />
    </form>
  </div>
);

ProjectSearchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

ProjectSearchbar = reduxForm({
  form: 'projectSearchbar'
})(ProjectSearchbar);

export default ProjectSearchbar;
