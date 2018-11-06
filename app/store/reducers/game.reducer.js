const initialState = {
  gameID: null,
  gameData: null,
  opponentID: null,
  userGrid: null,
  opponentGrid: null,
  nextShooterID: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_GAME_ID':
      return {
        ...state,
        gameID: action.id,
      };

    // deprecated
    case 'STORE_USER_GRID':
      return {
        ...state,
        userGrid: action.grid,
      };

    case 'STORE_OPPONENT_GRID':
      return {
        ...state,
        opponentGrid: action.grid,
      };

    case 'STORE_OPPONENT_ID':
      return {
        ...state,
        opponentID: action.id,
      };

    case 'STORE_NEXT_SHOOTER_ID':
      return {
        ...state,
        nextShooterID: action.id,
      };

    default:
      return state;
  }
};

export default reducer;
