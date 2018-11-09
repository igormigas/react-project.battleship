const initialState = {
  gameID: null,
  gameData: null,
  opponentID: null,
  nextShooterID: null,
  userGrid: null,
  opponentGrid: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_GAME_ID':
      return {
        ...state,
        gameID: action.id,
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

    case 'CLEAR_GAME_MEMORY':
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
