import { connect } from 'react-redux';
import { pick } from 'ramda';
import Snackbar from './Snackbar';

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  ...pick(['message', 'type'], state.snackbar)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
