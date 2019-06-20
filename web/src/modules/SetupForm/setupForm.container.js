import { connect } from 'react-redux';
import { action } from 'Src/utils';
import SetupForm from './SetupForm';
import { SETUP, SETUP_EMAIL } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onSetup: data => dispatch(action(SETUP.REQUEST, data)),
  onResendMail: data => dispatch(action(SETUP_EMAIL.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['email', 'complete', 'isLoading'], state.setup)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupForm);
