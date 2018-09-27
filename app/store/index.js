import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { createReducer } from './reducers';

// Pass native Redux Provider
export { Provider } from 'react-redux';

// Middlewares
const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export const store = createStore(
  createReducer(),
  applyMiddleware(...middlewares),
);
