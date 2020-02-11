import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import routes from 'Src/routes';
import Snackbar from 'Src/modules/Snackbar';
import Favicon from 'react-favicon';
import './app.scss';
import withAuth from 'Src/enhancers/withAuth';
import withSidebar from 'Src/enhancers/withSidebar';

function getComponent(route) {
  let Component = route.component;
  if (route.withSidebar) Component = withSidebar(Component);
  return route.withAuth === true
    ? withAuth(Component, true, route.access)
    : route.withAuth === false
    ? withAuth(Component, false)
    : Component;
}

const App = props => {
  // fuck this
  window.goto = props.goto;

  return (
    <div>
      <Favicon url="/images/favicon.ico" />
      <div>
        <Switch>
          {routes.map(route => (
            <Route
              exact={route.exact !== undefined ? route.exact : true}
              key={route.pathname}
              path={route.pathname}
              component={getComponent(route)}
            />
          ))}
        </Switch>
        <Snackbar />
      </div>
    </div>
  );
};

App.propTypes = {
  goto: PropTypes.func.isRequired
};

export default App;
