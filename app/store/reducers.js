import { combineReducers } from 'redux';

import appReducer from './routes/app.reducer';
import authReducer from './routes/auth.reducer';
import gameReducer from './routes/game.reducer';

export function createReducer() {
  return combineReducers({
    app: appReducer,
    game: gameReducer,
    auth: authReducer,
  });
}
