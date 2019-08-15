import { connect } from 'react-redux';
import ContactUsForm from './ContactUsForm';
import { action } from 'Src/utils';
import { CONTACT_US } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(action(CONTACT_US.REQUEST, data))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUsForm);
