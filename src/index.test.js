import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import MockLocalStorage from 'mock-local-storage';

import store from './state/store';

import Root from './components/Root';

const history = createHistory();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store(history)}>
      <ConnectedRouter history={history}>
        <Root/>
      </ConnectedRouter>
    </Provider>,
    div
  );
});
