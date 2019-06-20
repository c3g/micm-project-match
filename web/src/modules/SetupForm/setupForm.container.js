import { connect } from 'react-redux';
import { action } from 'Src/utils';
import SetupForm from './SetupForm';
import { SETUP, SETUP_EMAIL, OAUTH_DATA } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onSetup: data => dispatch(action(SETUP.REQUEST, data)),
  onResendMail: data => dispatch(action(SETUP_EMAIL.REQUEST, data)),
  fetchOAuthData: () => dispatch(action(OAUTH_DATA.REQUEST))
});

const mapStateToProps = state => ({
  ...pick(['email', 'complete', 'isLoading', 'oauth'], state.setup)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupForm);
