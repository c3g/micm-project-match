import { connect } from 'react-redux';
import { pick, compose } from 'ramda';
import withSidebar from './withSidebar';

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  ...(state.app.user && pick(['type'], state.app.user))
});

const connector = Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);

export default compose(
  connector,
  withSidebar
);
