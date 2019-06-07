import { connect } from 'react-redux';
import { action } from 'Src/utils';
import SetPasswordForm from './SetPasswordForm';
import { SET_PASSWORD } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSetPassword: data => dispatch(action(SET_PASSWORD.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPasswordForm);
