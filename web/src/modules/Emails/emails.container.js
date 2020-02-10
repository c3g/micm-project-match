import Emails from './Emails';
import { connect } from 'react-redux';
import { action } from 'Src/utils';
import { EMAIL } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  listEmails: () => dispatch(action(EMAIL.LIST.REQUEST)),
  createEmail: data => dispatch(action(EMAIL.CREATE.REQUEST, data)),
  updateEmail: data => dispatch(action(EMAIL.UPDATE.REQUEST, data)),
  deleteEmail: data => dispatch(action(EMAIL.DELETE.REQUEST, data))
});

const mapStateToProps = state => ({
  isLoading: state.emails.isLoading,
  message: state.emails.message,
  emails: state.emails.list
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);
