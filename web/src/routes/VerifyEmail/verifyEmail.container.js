import { connect } from 'react-redux';
import VerifyEmail from './VerifyEmail';
import { action } from 'Src/utils';
import { VERIFY_EMAIL } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  verifyEmail: data => dispatch(action(VERIFY_EMAIL.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmail);
