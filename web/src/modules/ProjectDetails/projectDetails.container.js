import { connect } from 'react-redux';
import { pick } from 'ramda';
import { action } from 'Src/utils';
import { PROJECT, DOCUMENT } from 'Src/constants/actionTypes';
import ProjectDetails from './ProjectDetails';

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
          firstName: '',
          lastName: '',
          department: '',
          email: '',
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
  ...pick(['isLoading', 'project', 'application'], state.projectDetails),
  userId: state.app.user.id,
  userType: state.app.user.type
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails);
