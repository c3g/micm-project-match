import React from 'react';
import PropTypes from 'prop-types';
import InputField from 'Src/modules/InputField';
import { Field, reduxForm } from 'redux-form';

const ProjectSearchbarField = ({ input, type, placeholder }) => (
  <InputField {...input} type={type} placeholder={placeholder} />
);

ProjectSearchbarField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};

let ProjectSearchbar = props => (
  <div className="project-searchbar">
    <form
      onSubmit={props.handleSubmit(data =>
        props.onSearch({
          keywords: props.selected,
          ...data
        })
      )}
    >
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
  isLoading: PropTypes.bool.isRequired,
  selected: PropTypes.array,
  onSearch: PropTypes.func.isRequired
};

ProjectSearchbar = reduxForm({
  form: 'projectSearchbar'
})(ProjectSearchbar);

export default ProjectSearchbar;
