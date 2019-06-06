import { connect } from 'react-redux';
import { action } from 'Src/utils';
import SetPasswordForm from './SetPasswordForm';

const mapDispatchToProps = dispatch => ({
  onSetPassword: data => dispatch(action('FETCH_SET_PASSWORD_BEGIN', data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPasswordForm);
