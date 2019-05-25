import '@babel/polyfill';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'Src/core/App';
import { Provider } from 'react-redux';
import store from 'Src/store';

let Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root = process.env.NODE_ENV === 'development' ? hot(Root) : Root;

ReactDOM.render(<Root />, document.getElementById('root'));
