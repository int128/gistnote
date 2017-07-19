import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

import store from './state/store';

import Root from './components/Root';

import './index.css';

const history = createHistory();

ReactDOM.render(
  <Provider store={store(history)}>
    <ConnectedRouter history={history}>
      <Root/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
