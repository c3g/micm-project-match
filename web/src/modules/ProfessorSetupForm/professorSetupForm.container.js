import { connect } from 'react-redux';
import { action } from 'Src/utils';
import professorSetupForm from './ProfessorSetupForm';
import { PROFESSOR_SETUP } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onSetProfessorDetails: data => dispatch(action(PROFESSOR_SETUP.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['isLoading'], state.professorSetup)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(professorSetupForm);
