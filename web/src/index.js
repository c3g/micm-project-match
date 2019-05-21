import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Src/core/App';
import { Provider } from 'react-redux';
import store from 'Src/store';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
