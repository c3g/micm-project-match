import React from 'react';
import PropTypes from 'prop-types';
import * as k from 'Src/constants/values';
import Loader from 'Src/modules/Loader';

const loggedInRedirect = '/';
const loggedOutRedirect = '/home';

const withAuth = (
  Component,
  authRequired = true,
  type = [k.ADMIN, k.PROFESSOR, k.STUDENT, k.UNSET, '']
) =>
  class withAuthHOC extends React.Component {
    state = {
      start: false,
      loggedIn: null
    };

    static propTypes = {
      loggedIn: PropTypes.bool.isRequired,
      isLoading: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired,
      type: PropTypes.string,
      verified: PropTypes.bool,
      strategy: PropTypes.string,
      professor: PropTypes.object
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.isLoading || nextProps.loggedIn === prevState.loggedIn)
        return null;
      if (!nextProps.loggedIn && authRequired)
        nextProps.history.push(loggedOutRedirect);
      else if (nextProps.loggedIn && !authRequired)
        nextProps.history.push(loggedInRedirect);
      else if (nextProps.loggedIn && !type.includes(nextProps.type))
        nextProps.history.push(loggedInRedirect);
      else if (nextProps.loggedIn && !nextProps.verified)
        nextProps.history.push('/setup');
      else if (
        nextProps.loggedIn &&
        nextProps.type === k.PROFESSOR &&
        nextProps.professor === null
      )
        nextProps.history.push('/professor-setup');
      return { start: true, loggedIn: nextProps.loggedIn };
    }

    componentDidMount() {
      if (this.props.isLoading) return;
      if (!this.props.loggedIn && authRequired)
        this.props.history.push(loggedOutRedirect);
      else if (this.props.loggedIn && !authRequired)
        this.props.history.push(loggedInRedirect);
      else if (this.props.loggedIn && !type.includes(this.props.type))
        this.props.history.push(loggedInRedirect);
      else if (this.props.loggedIn && !this.props.verified)
        this.props.history.push('/setup');
      else if (
        this.props.loggedIn &&
        this.props.type === k.PROFESSOR &&
        this.props.professor === null
      )
        this.props.history.push('/professor-setup');
      else this.setState({ start: true });
    }

    render = () =>
      this.state.start ? <Component {...this.props} /> : <Loader />;
  };

export default withAuth;
