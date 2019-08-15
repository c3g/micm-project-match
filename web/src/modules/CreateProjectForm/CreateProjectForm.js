import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RoundedButton from 'Src/modules/RoundedButton';
import InputField from 'Src/modules/InputField';
import TextArea from 'Src/modules/TextArea';
import Checkbox from 'Src/modules/Checkbox';
import './createProjectForm.scss';
import { axis, organizations } from 'Src/config/data';
import Dropzone from 'Src/modules/Dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { remove, uniqBy, prop } from 'ramda';
import KeywordSelector from 'Src/modules/KeywordSelector';
import { formatDate } from 'Src/utils';

const createProjectValidate = values => {
  const errors = {};
  if (!values.title) errors.title = 'Required';
  if (!values.startDate) errors.startDate = 'Required';
  if (!values.abstract) errors.abstract = 'Required';
  if (!values.description) errors.description = 'Required';
  if (!values.datasets) errors.datasets = 'Required';
  if (!values.motive) errors.motive = 'Required';
  return errors;
};

let CreateProjectCheckbox = ({ input: { onChange, ...input }, ...rest }) => (
  <Checkbox
    {...input}
    {...rest}
    onChange={value => onChange(value)}
    type="checkbox"
  />
);

CreateProjectCheckbox.propTypes = {
  input: PropTypes.object.isRequired
};

let CreateProjectSelect = ({ input, meta: { touched, error } }) => (
  <div className={`create-project-field ${error && touched ? 'error' : ''}`}>
    <input {...input} type="select" />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectSelect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

let CreateProjectTextArea = ({
  input,
  height,
  label,
  meta: { touched, error }
}) => (
  <div
    style={{ height: height || 150 }}
    className={`create-project-text-area ${error && touched ? 'error' : ''}`}
  >
    <TextArea {...input} placeholder={label} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectTextArea.propTypes = {
  height: PropTypes.number,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

let CreateProjectField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`create-project-field ${error && touched ? 'error' : ''}`}>
    <InputField {...input} placeholder={label} type={type} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

CreateProjectField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

class CreateProjectFormComponent extends Component {
  state = { files: [] };

  static propTypes = {
    initialize: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onCreateProject: PropTypes.func.isRequired,
    onUpdateProject: PropTypes.func.isRequired,
    initializeKeyword: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      abstract: PropTypes.string.isRequired,
      openForStudents: PropTypes.bool.isRequired,
      authorId: PropTypes.number.isRequired,
      axis: PropTypes.string.isRequired,
      datasets: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      motive: PropTypes.string.isRequired,
      organizations: PropTypes.array,
      startDate: PropTypes.string.isRequired,
      timeframe: PropTypes.isRequired,
      chosenId: PropTypes.number,
      tags: PropTypes.array,
      tagId: PropTypes.array,
      documents: PropTypes.array,
      budget: PropTypes.string
    })
  };

  componentDidMount() {
    if (this.props.project) {
      const {
        organizations,
        authorId,
        chosenId,
        tags,
        tagId,
        documents,
        ...project
      } = this.props.project;
      this.props.initialize({
        ...project,
        startDate: formatDate(project.startDate),
        ...this.props.project.organizations.reduce(
          (a, c) => ({ ...a, [c]: true }),
          {}
        )
      });
      if (tags && tagId)
        tagId
          .map((tagId, i) => ({ text: tags[i], id: tagId }))
          .forEach(this.props.initializeKeyword);
    }
  }

  render() {
    const props = this.props;
    return (
      <div className="create-project-form">
        <div className="form">
          <form
            onSubmit={props.handleSubmit(data =>
              this.props.project
                ? props.onUpdateProject({
                    data: { ...data, tagId: props.selected.map(tag => tag.id) },
                    push: props.history.push,
                    files: this.state.files
                  })
                : props.onCreateProject({
                    data: { ...data, tagId: props.selected.map(tag => tag.id) },
                    push: props.history.push,
                    files: this.state.files
                  })
            )}
          >
            {props.project && props.project.chosenId && (
              <div>
                Budget
                <Field
                  name="budget"
                  component={CreateProjectField}
                  type="text"
                />
              </div>
            )}
            <div>
              Project Title
              <Field name="title" component={CreateProjectField} type="text" />
            </div>
            <div className="row">
              <div className="half-width">
                Prefered project start date
                <Field
                  name="startDate"
                  component={CreateProjectField}
                  type="date"
                />
              </div>
              <div className="half-width">
                MiCM Axis
                <Field name="axis" component="select">
                  <option hidden>Click here to select</option>
                  {axis.map((axis, i) => (
                    <option key={`axis_${i}`} value={axis}>
                      {axis}
                    </option>
                  ))}
                </Field>
              </div>
            </div>
            <div>
              High level abstract
              <Field name="abstract" component={CreateProjectTextArea} />
            </div>
            <div>
              Project description
              <Field
                height={300}
                name="description"
                component={CreateProjectTextArea}
              />
            </div>
            <div>
              Description of datasets to be used or generated (collaborations
              for study design are also encouraged)
              <Field name="datasets" component={CreateProjectTextArea} />
            </div>
            <div>
              Explain why you see this as a collaborative research project and
              what you hope to gain from the collaboration. Highlight any
              potential of the proposed work to progress to other funding
              competition.
              <Field name="motive" component={CreateProjectTextArea} />
            </div>
            <div>
              Relevant to the following organization/initiatives (Select all
              that apply)
              <div className="checkbox-group">
                {organizations.map((organization, i) => (
                  <div className="checkbox-container" key={`organization_${i}`}>
                    <Field
                      name={organization}
                      component={CreateProjectCheckbox}
                      text={organization}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="half-width">
                Expected project timeframe
                <Field name="timeframe" component="select">
                  <option hidden>Click here to select</option>
                  <option value={'3 - 4 Months'}>3 - 4 Months</option>
                  <option value={'6 - 12 Months'}>6 - 12 Months</option>
                </Field>
              </div>
              <div />
              <div className="half-width">
                Can students apply for this project?
                <div>
                  <Field name="openForStudents" component="select">
                    <option hidden>Click here to select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Field>
                </div>
              </div>
            </div>
            {!this.props.project && (
              <div className="documents">
                Add any documents wich are relevant to the project
                <div className="dropzone-container">
                  <Dropzone
                    onDrop={files =>
                      this.setState({
                        files: uniqBy(prop('name'), [
                          ...this.state.files,
                          ...files
                        ])
                      })
                    }
                    text="Drag 'n' drop documents here, or click to select them"
                  />
                </div>
                <div className="selected-files">
                  <span>{this.state.files.length > 0 && `Selected files`}</span>
                  <div className="file-list">
                    {this.state.files.map((file, i) => (
                      <div className="file" key={`file_${i}`}>
                        <div>{file.name}</div>
                        <button
                          className="remove-icon"
                          onClick={() =>
                            this.setState({
                              files: remove(i, 1, this.state.files)
                            })
                          }
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <KeywordSelector />
            <div className="right-button">
              <RoundedButton>
                {this.props.project ? 'Update Project' : 'Create Project'}
              </RoundedButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const CreateProjectForm = reduxForm({
  form: 'createProject',
  validate: createProjectValidate
})(CreateProjectFormComponent);

export default withRouter(CreateProjectForm);
