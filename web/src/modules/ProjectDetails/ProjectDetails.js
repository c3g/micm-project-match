import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Heading from 'Src/modules/Heading';
import RoundedButton from 'Src/modules/RoundedButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { remove, uniqBy, prop } from 'ramda';
import Dropzone from 'Src/modules/Dropzone';
import './projectDetails.scss';

class ProjectDetails extends Component {
  static propTypes = {
    fetchProject: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    deleteDocument: PropTypes.func.isRequired,
    uploadDocuments: PropTypes.func.isRequired,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      abstract: PropTypes.string.isRequired,
      openForStudents: PropTypes.bool.isRequired,
      authorId: PropTypes.number.isRequired,
      department: PropTypes.string,
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      axis: PropTypes.string,
      datasets: PropTypes.string,
      description: PropTypes.string,
      motive: PropTypes.string,
      organizations: PropTypes.array,
      startDate: PropTypes.string,
      timeframe: PropTypes.string,
      chosenId: PropTypes.number,
      tags: PropTypes.array,
      tagId: PropTypes.array,
      documents: PropTypes.array
    }).isRequired,
    application: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
  };

  state = { dropzoneOpen: false, files: [] };

  componentDidMount() {
    const {
      history: { push },
      id
    } = this.props;
    this.props.fetchProject({ push, id });
  }

  render() {
    return (
      <div className="project-details">
        <Heading hideUnderline>{this.props.project.title}</Heading>
        <div className="abstract">{this.props.project.abstract}</div>
        {this.props.userId === this.props.project.authorId ||
        this.props.userId === this.props.project.chosenId ? (
          <div className="details">
            <div>
              <span>Prefered project start date</span>
              <span>
                {new Date(this.props.project.startDate).toDateString()}
              </span>
            </div>
            <div>
              <span>MiCM Axis</span>
              <span>{this.props.project.axis}</span>
            </div>
            <div>
              <span>Expected project timeframe</span>
              <span>{this.props.project.timeframe}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="sub-heading">Professor Details</div>
            <div className="details">
              {(this.props.project.firstName ||
                this.props.project.lastName) && (
                <div>
                  <span>Name</span>
                  <span className="blue">
                    <Link to={`/user/${this.props.project.authorId}`}>
                      {this.props.project.firstName}
                      &nbsp;
                      {this.props.project.lastName}
                    </Link>
                  </span>
                </div>
              )}
              {this.props.project.email && (
                <div>
                  <span>Email</span>
                  <span>{this.props.project.email}</span>
                </div>
              )}
              {this.props.project.department && (
                <div>
                  <span>Department</span>
                  {this.props.project.department && (
                    <span>{this.props.project.department}</span>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {this.props.userId !== this.props.project.authorId && (
          <div className="sub-heading">Other Details</div>
        )}
        <div className="open-for-students">
          This project is&nbsp;
          {this.props.project.openForStudents
            ? 'open to both students and professors'
            : 'only open to professors'}
        </div>
        <div className="tags">
          {this.props.project.tags.map(
            (tag, i) =>
              tag && (
                <div className="tag" key={`tag_${i}`}>
                  {tag}
                </div>
              )
          )}
        </div>
        {(this.props.userId === this.props.project.authorId ||
          this.props.userId === this.props.project.chosenId) && (
          <div className="details-long">
            <div>
              <div>Project description</div>
              <div>{this.props.project.description}</div>
            </div>
            <div>
              <div>Description of datasets to be used or generated</div>
              <div>{this.props.project.datasets}</div>
            </div>
            <div>
              <div>
                Why you see this as a collaborative research project and what
                you hope to gain from the collaboration
              </div>
              <div>{this.props.project.motive}</div>
            </div>
            {this.props.project.organizations.length > 0 && (
              <div>
                <div>Relevant to the following organization/initiatives</div>
                <div>
                  {this.props.project.organizations.map((organization, i) => (
                    <div key={`organization_${i}`}>{organization}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {(this.props.userId === this.props.project.authorId ||
          this.props.userId === this.props.project.chosenId) && (
          <div className="documents">
            <div>
              Relevant Documents&nbsp;&nbsp;
              <button
                className="delete-button"
                onClick={() =>
                  this.setState({ dropzoneOpen: !this.state.dropzoneOpen })
                }
              >
                <FontAwesomeIcon
                  icon={this.state.dropzoneOpen ? faTimes : faPlus}
                  color={this.state.dropzoneOpen ? '#00a1f8' : '#00FF00'}
                />
              </button>
            </div>
            {this.props.project.documents.length === 0
              ? 'None'
              : this.props.project.documents.map((document, i) => (
                  <div className="document" key={`document_${i}`}>
                    {(this.props.userId === this.props.project.authorId ||
                      this.props.userId === this.props.project.chosenId) && (
                      <button
                        className="delete-button"
                        onClick={() =>
                          this.props.deleteDocument({
                            id: document.id,
                            projectId: this.props.project.id,
                            push: this.props.history.push
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faTrash} color="#e05454" />
                      </button>
                    )}
                    <a
                      href={`/api/document/${document.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {document.name}
                    </a>
                  </div>
                ))}
            {this.state.dropzoneOpen && (
              <>
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
              </>
            )}
          </div>
        )}
        {this.state.dropzoneOpen && (
          <RoundedButton
            onClick={() => {
              this.props.uploadDocuments({
                files: this.state.files,
                id: this.props.project.id,
                push: this.props.history.push
              });
              this.setState({
                dropzoneOpen: !this.state.dropzoneOpen,
                files: []
              });
            }}
          >
            Upload
          </RoundedButton>
        )}
        {this.props.userId === this.props.project.authorId ||
        this.props.userId === this.props.project.chosenId ? (
          <div className="apply">
            <Link
              to={{
                pathname: '/update-project',
                state: {
                  project: this.props.project
                }
              }}
            >
              <RoundedButton>Update</RoundedButton>
            </Link>
          </div>
        ) : this.props.application ? (
          <div className="apply">
            <Link
              to={{
                pathname: '/application',
                state: {
                  project: this.props.project,
                  application: this.props.application
                }
              }}
            >
              <RoundedButton>Update Application</RoundedButton>
            </Link>
          </div>
        ) : (
          <div className="apply">
            <Link
              to={{
                pathname: '/application',
                state: {
                  project: this.props.project
                }
              }}
            >
              <RoundedButton>Apply</RoundedButton>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ProjectDetails);
