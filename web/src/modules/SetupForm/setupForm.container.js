import { connect } from 'react-redux';
import { action } from 'Src/utils';
import SetupForm from './SetupForm';
import { pick } from 'ramda';
import {
  SETUP,
  OAUTH_DATA,
  SETUP_REFILL,
  SETUP_FILLED
} from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSetup: data => dispatch(action(SETUP.REQUEST, data)),
  onRefillForm: () => dispatch(action(SETUP_REFILL)),
  fetchOAuthData: () => dispatch(action(OAUTH_DATA.REQUEST)),
  onFormFilled: () => dispatch(action(SETUP_FILLED))
});

const mapStateToProps = state => ({
  ...pick(['email', 'complete', 'isLoading', 'oauth'], state.setup),
  userData: pick(
    ['email', 'firstName', 'lastName', 'tel', 'type', 'verified'],
    state.app.user
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupForm);
