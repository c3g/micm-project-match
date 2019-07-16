import { connect } from 'react-redux';
import { pick } from 'ramda';
import { action } from 'Src/utils';
import { PROJECT } from 'Src/constants/actionTypes';
import ProjectDetails from './ProjectDetails';

const mapDispatchToProps = dispatch => ({
  fetchProject: data => dispatch(action(PROJECT.FETCH.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading', 'project', 'application'], state.projectDetails),
  userId: state.app.user.id
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails);
