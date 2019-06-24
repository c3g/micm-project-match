import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

const App = () => (
  <div>
    <Favicon url="/images/favicon.ico" />
    <Router>
      <div>
        <Switch>
          {routes.map(route => (
            <Route
              exact
              key={route.pathname}
              path={route.pathname}
              component={getComponent(route)}
            />
          ))}
        </Switch>
        <Snackbar />
      </div>
    </Router>
  </div>
);

export default App;
