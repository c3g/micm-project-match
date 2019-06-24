import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import { pick } from 'ramda';

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  ...pick(['user'], state.app)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
