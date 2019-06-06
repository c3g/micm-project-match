import { connect } from 'react-redux';
import { action } from 'Src/utils';
import RegisterForm from './RegisterForm';

const mapDispatchToProps = dispatch => ({
  onRegister: data => dispatch(action('FETCH_REGISTER_BEGIN', data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
