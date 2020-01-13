import { connect } from 'react-redux';
import SideNav from './SideNav';
import { pick } from 'ramda';

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  user: state.app.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
