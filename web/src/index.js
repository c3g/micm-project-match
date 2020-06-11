import '@babel/polyfill';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from 'Src/core/App';
import configureRootReducer from 'Src/core/rootReducer';
import configureStore, { history } from 'Src/store';

import 'Src/core/global.scss'

const rootReducer = configureRootReducer(history);
const store = configureStore(rootReducer);

let Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

Root = process.env.NODE_ENV === 'development' ? hot(Root) : Root;

ReactDOM.render(<Root />, document.getElementById('root'));
