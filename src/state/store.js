import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import initialState from './initialState';
import rootSaga from './sagas';

export default history => {
  const devMiddlewares = [];
  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    devMiddlewares.push(logger);
  }

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers(reducers),
    initialState(),
    applyMiddleware(sagaMiddleware, routerMiddleware(history), ...devMiddlewares));

  sagaMiddleware.run(rootSaga);

  return store;
}
