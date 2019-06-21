import { connect } from 'react-redux';
import { pick, compose } from 'ramda';
import withAuth from './withAuth';

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  ...pick(['loggedIn', 'isLoading'], state.app),
  ...pick(['verified', 'strategy', 'type'], state.app.user)
});

const connector = Component =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);

export default compose(
  connector,
  withAuth
);
