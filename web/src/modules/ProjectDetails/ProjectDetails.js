import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pick, remove, uniqBy, prop } from 'ramda';
import { action } from 'Src/utils';
import { PROJECT, DOCUMENT } from 'Src/constants/actionTypes';
import { pdfFromProject } from 'Src/utils/pdf';
import Heading from 'Src/modules/Heading';
import Button from 'Src/modules/Button';
import Icon from 'Src/modules/Icon';
import Dropzone from 'Src/modules/Dropzone';
import * as k from 'Src/constants/values';
import './projectDetails.scss';
import Loader from 'Src/modules/Loader';
import ErrorMessage from 'Src/modules/ErrorMessage';

const mapDispatchToProps = dispatch => ({
  fetchProject: data => dispatch(action(PROJECT.FETCH.REQUEST, data)),
  deleteProject: data => dispatch(action(PROJECT.DELETE.REQUEST, data)),
  deleteDocument: data => dispatch(action(DOCUMENT.DELETE.REQUEST, data)),
  uploadDocuments: data => dispatch(action(DOCUMENT.CREATE.REQUEST, data)),
  clearProject: () =>
    dispatch(
      action(PROJECT.FETCH.RECEIVE, {
        application: null,
        project: {
          id: 0,
          title: '',
          abstract: '',
          openForStudents: true,
          authorId: 0,
          author: {
            firstName: '',
            lastName: '',
            department: '',
            email: ''
          },
          tags: [],
          tagId: [],
          documents: [],
          organizations: [],
          files: [],
          approved: false
        }
      })
    )
});

const mapStateToProps = state => ({
  ...pick(['isLoading', 'project', 'application', 'error'], state.projectDetails),
  userId: state.app.user.id,
  user: state.app.user,
});

class ProjectDetails extends Component {
  static propTypes = {
    fetchProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
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
      approved: PropTypes.bool.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
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

    const { project, error, id } = this.props;
    const { author } = project;

    const isAdmin = this.props.user.type === k.ADMIN;
    const isApprovedProfessor = this.props.user.type === k.PROFESSOR && this.props.user.approved;
    const isAuthor = this.props.userId === project.authorId;

    const canSeeDetails = isAdmin || isAuthor || isApprovedProfessor;

    if (error)
      return (
        <div className="project-details">
          <Heading hideUnderline>Project {id}</Heading>
          <ErrorMessage error={error} />
        </div>
      )

    return (
      <div className="project-details">
        <Heading
          hideUnderline
          extra={
            <React.Fragment>
              {
              /*
               * <div className={'status ' + (project.approved ? 'approved' : 'unapproved')}>
               *   {project.approved && 'Approved' || 'Unapproved'}
               * </div>
               */
              }
              {isAdmin && (
                <div className="extract-button">
                  <button onClick={this.extractAsPDF}>Download as PDF</button>
                </div>
              )}
            </React.Fragment>
          }
        >
          {project.title}
        </Heading>
        <div className="tags">
          {project.tags.map(
            (tag, i) =>
              tag && (
                <div className="tag" key={`tag_${i}`}>
                  {tag}
                </div>
              )
          )}
        </div>
        <div className="abstract">{project.abstract}</div>
        <div className="details">
          <div>
            <span>Can students apply?</span>
            <span>
              {project.openForStudents ? 'Yes' : 'No'}
            </span>
          </div>
          {canSeeDetails && (
            <React.Fragment>
              <div>
                <span>Prefered project start date</span>
                <span>
                  {new Date(project.startDate).toDateString()}
                </span>
              </div>
              <div>
                <span>MiCM Axis</span>
                <span>{project.axis}</span>
              </div>
              <div>
                <span>Expected project timeframe</span>
                <span>{project.timeframe}</span>
              </div>
            </React.Fragment>
          )}
        </div>
        {!isAuthor && (
          <React.Fragment>
            <div className="sub-heading">Professor Details</div>
            <div className="details">
              <div>
                <span>Name</span>
                <span className="blue">
                  <Link to={`/user/${project.authorId}`}>
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
        {canSeeDetails && (
          <React.Fragment>
            <div className="sub-heading">Other Details</div>
            <div className="details-long">
              <div>
                <div>Project description</div>
                <div>{project.description}</div>
              </div>
              <div>
                <div>Description of datasets to be used or generated</div>
                <div>{project.datasets}</div>
              </div>
              <div>
                <div>
                  Why you see this as a collaborative research project and what
                  you hope to gain from the collaboration
                </div>
                <div>{project.motive}</div>
              </div>
              {project.organizations?.length > 0 && (
                <div>
                  <div>Relevant to the following organization/initiatives</div>
                  <div>
                    {project.organizations.map((organization, i) => (
                      <div key={`organization_${i}`}>{organization}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
        {(isAdmin || isAuthor) && (
          <div className="documents">
            <div>
              Relevant Documents&nbsp;&nbsp;
              {this.props.user.type !== k.ADMIN && (
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
            {project.documents.length === 0
              ? 'None'
              : project.documents.map((document, i) => (
                  <div className="document" key={`document_${i}`}>
                    {isAuthor && (
                      <button
                        className="delete-button"
                        onClick={() =>
                          this.props.deleteDocument({
                            id: document.id,
                            projectId: project.id
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
          <Button
            onClick={() => {
              this.props.uploadDocuments({
                files: this.state.files,
                id: project.id
              });
              this.setState({
                dropzoneOpen: !this.state.dropzoneOpen,
                files: []
              });
            }}
          >
            Upload
          </Button>
        )}
        <div className="apply flex-row">
          {(isAdmin || isAuthor) && (
            <Button
              color="danger"
              onClick={() => {
                if (confirm('Are you sure you want to delete this project?'))
                  this.props.deleteProject(project);
              }}
            >
              Delete
            </Button>
          )}
          <div className="flex-fill" />
          {(isAdmin || isAuthor) ? (
            <Link
              to={{
                pathname: '/update-project',
                state: {
                  project: project
                }
              }}
            >
              <Button>Update</Button>
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails);
