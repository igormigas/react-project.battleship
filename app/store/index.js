import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { createReducer } from './reducers';
import logger from 'redux-logger';

// Pass native Redux Provider
export { Provider } from 'react-redux';

// Middlewares
let middlewares = [];
if (process.env.NODE_ENV !== 'production') {
	middlewares.push(logger);
}

export const store = createStore(
	createReducer(),
	applyMiddleware(...middlewares)
);
