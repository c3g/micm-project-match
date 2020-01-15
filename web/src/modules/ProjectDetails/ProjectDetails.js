import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { pdfFromProject } from 'Src/utils/pdf';
import Heading from 'Src/modules/Heading';
import RoundedButton from 'Src/modules/RoundedButton';
import Icon from 'Src/modules/Icon';
import { remove, uniqBy, prop } from 'ramda';
import Dropzone from 'Src/modules/Dropzone';
import * as k from 'Src/constants/values';
import './projectDetails.scss';
import Loader from 'Src/modules/Loader';

class ProjectDetails extends Component {
  static propTypes = {
    fetchProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
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
      tags: PropTypes.array,
      tagId: PropTypes.array,
      documents: PropTypes.array,
      budget: PropTypes.string,
      approved: PropTypes.bool.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    clearProject: PropTypes.func.isRequired
  };

  state = { dropzoneOpen: false, files: [] };

  componentDidMount() {
    const { id } = this.props;
    this.props.fetchProject({ id });
  }

  componentWillUnmount() {
    this.props.clearProject();
  }

  extractAsPDF = () => {
    const project = this.props.project;

    const filename = `project-${project.title}.pdf`;
    const pdf = pdfFromProject(project);
    pdf.set({ filename }).save();
  };

  render() {
    if (this.props.isLoading) return <Loader />;

    const { project } = this.props;
    const { author } = project;

    const isAuthor = this.props.userId === project.authorId;

    const canSeeDetails = this.props.userType === k.ADMIN || isAuthor;

    return (
      <div className="project-details">
        <div>
          <Heading hideUnderline>{this.props.project.title}</Heading>
          <div className="approved">
            {this.props.project.approved && 'Approved'}
          </div>
        </div>
        {this.props.userType === k.ADMIN && (
          <div className="extract-button">
            <button onClick={this.extractAsPDF}>Download as PDF</button>
          </div>
        )}
        <div className="abstract">{this.props.project.abstract}</div>
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
        {canSeeDetails && (
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
            <div>
              <span>Requested budget</span>
              <span>
                {this.props.project.budget ? (
                  this.props.project.budget
                ) : (
                  <span className="danger">Unspecified</span>
                )}
              </span>
            </div>
            {!this.props.project.budget && (
              <div>
                <span>
                  <Link
                    to={{
                      pathname: '/update-project',
                      state: {
                        project: this.props.project
                      }
                    }}
                  >
                    Set a budget
                  </Link>
                </span>
              </div>
            )}
          </div>
        )}
        {!isAuthor && (
          <React.Fragment>
            <div className="sub-heading">Professor Details</div>
            <div className="details">
              <div>
                <span>Name</span>
                <span className="blue">
                  <Link to={`/user/${this.props.project.authorId}`}>
                    {author.firstName} {author.lastName}
                  </Link>
                </span>
              </div>
              <div>
                <span>Email</span>
                <span>{author.email}</span>
              </div>
              <div>
                <span>Department</span>
                <span>{author.department}</span>
              </div>
            </div>
          </React.Fragment>
        )}
        <div className="sub-heading">Other Details</div>
        {(this.props.userType === k.ADMIN ||
          this.props.userId === this.props.project.authorId) && (
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
        {(this.props.userType === k.ADMIN ||
          this.props.userId === this.props.project.authorId) && (
          <div className="documents">
            <div>
              Relevant Documents&nbsp;&nbsp;
              {this.props.userType !== k.ADMIN && (
                <button
                  className="delete-button"
                  onClick={() =>
                    this.setState({ dropzoneOpen: !this.state.dropzoneOpen })
                  }
                >
                  <Icon
                    name={this.state.dropzoneOpen ? 'times' : 'plus'}
                    color={this.state.dropzoneOpen ? '#00a1f8' : '#00CC00'}
                  />
                </button>
              )}
            </div>
            {this.props.project.documents.length === 0
              ? 'None'
              : this.props.project.documents.map((document, i) => (
                  <div className="document" key={`document_${i}`}>
                    {this.props.userId === this.props.project.authorId && (
                      <button
                        className="delete-button"
                        onClick={() =>
                          this.props.deleteDocument({
                            id: document.id,
                            projectId: this.props.project.id
                          })
                        }
                      >
                        <Icon name="trash" color="#e05454" />
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
              <React.Fragment>
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
                          <Icon name="times" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
        {this.state.dropzoneOpen && (
          <RoundedButton
            onClick={() => {
              this.props.uploadDocuments({
                files: this.state.files,
                id: this.props.project.id
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
        <div className="apply flex-row">
          {(this.props.userType === k.ADMIN ||
            this.props.userId === this.props.project.authorId) && (
            <RoundedButton
              color="danger"
              onClick={() => {
                if (confirm('Are you sure you want to delete this project?'))
                  this.props.deleteProject(this.props.project);
              }}
            >
              Delete
            </RoundedButton>
          )}
          <div className="flex-fill" />
          {this.props.userType === k.ADMIN ||
          this.props.userId === this.props.project.authorId ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

export default ProjectDetails;
