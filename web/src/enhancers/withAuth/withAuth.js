import React from 'react';
import PropTypes from 'prop-types';
import * as k from 'Src/constants/values';
import Loader from 'Src/modules/Loader';

const loggedInRedirect = '/';
const loggedOutRedirect = '/signin';

const withAuth = (
  Component,
  authRequired = true,
  type = [k.ADMIN, k.PROFESSOR, k.STUDENT, k.UNSET, '']
) =>
  class withAuthHOC extends React.Component {
    state = {
      start: false,
      wasLoading: true
    };

    static propTypes = {
      loggedIn: PropTypes.bool.isRequired,
      isLoading: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired,
      type: PropTypes.string.isRequired,
      verified: PropTypes.bool,
      strategy: PropTypes.string
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.isLoading === prevState.wasLoading) return null;
      if (!nextProps.loggedIn && authRequired)
        nextProps.history.push(loggedOutRedirect);
      else if (nextProps.loggedIn && !authRequired)
        nextProps.history.push(loggedInRedirect);
      else if (!type.includes(nextProps.type))
        nextProps.history.push(loggedInRedirect);
      return { start: true };
    }

    componentDidMount() {
      if (this.props.isLoading) return;
      if (!this.props.loggedIn && authRequired)
        this.props.history.push(loggedOutRedirect);
      else if (this.props.loggedIn && !authRequired)
        this.props.history.push(loggedInRedirect);
      else if (!type.includes(this.props.type))
        this.props.history.push(loggedInRedirect);
      else this.setState({ start: true });
    }

    render = () =>
      this.state.start ? <Component {...this.props} /> : <Loader />;
  };

export default withAuth;
