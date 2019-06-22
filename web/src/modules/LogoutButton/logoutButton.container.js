import { connect } from 'react-redux';
import { action } from 'Src/utils';
import LogoutButton from './LogoutButton';
import { LOGOUT } from 'Src/constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(action(LOGOUT.REQUEST))
});

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton);
