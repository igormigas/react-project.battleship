import { combineReducers } from 'redux';

import appReducer from './reducers/app.reducer';
import authReducer from './reducers/auth.reducer';
import gameReducer from './reducers/game.reducer';

export function createReducer() {
  return combineReducers({
    app: appReducer,
    game: gameReducer,
    auth: authReducer,
  });
}
