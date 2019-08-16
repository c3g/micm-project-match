import { connect } from 'react-redux';
import ProfessorList from './ProfessorList';
import { action } from 'Src/utils';
import { pick } from 'ramda';
import {
  PROFESSOR_LIST,
  APPROVE_PROFESSOR,
  DISAPPROVE_PROFESSOR
} from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  listProfessors: () => dispatch(action(PROFESSOR_LIST.REQUEST)),
  approveProfessor: data => dispatch(action(APPROVE_PROFESSOR.REQUEST, data)),
  disapproveProfessor: data =>
    dispatch(action(DISAPPROVE_PROFESSOR.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['professors'], state.professorList)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessorList);
