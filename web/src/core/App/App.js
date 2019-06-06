import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from 'Src/routes';
import Snackbar from 'Src/modules/Snackbar';
import './app.scss';

const App = () => (
  <div>
    <Router>
      <div>
        <Switch>
          {routes.map(route => (
            <Route
              exact
              key={route.pathname}
              path={route.pathname}
              component={route.component}
            />
          ))}
        </Switch>
        <Snackbar />
      </div>
    </Router>
  </div>
);

export default App;
