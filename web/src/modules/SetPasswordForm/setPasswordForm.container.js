import { connect } from 'react-redux';
import { action } from 'Src/utils';
import SetPasswordForm from './SetPasswordForm';
import { SET_PASSWORD } from 'Src/constants/actionTypes';
import { pick } from 'ramda';

const mapDispatchToProps = dispatch => ({
  onSetPassword: data => dispatch(action(SET_PASSWORD.REQUEST, data))
});

const mapStateToProps = state => ({
  ...pick(['complete'], state.setPassword)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPasswordForm);
