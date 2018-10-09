const initialState = {
  gameData: null,
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

    case 'STORE_GAME_DATA':
      return {
        ...state,
        gameData: action.data,
      };

    case 'STORE_USER_GRID':
      return {
        ...state,
        userGrid: action.data,
      };

    case 'STORE_OPPONENT_GRID':
      return {
        ...state,
        opponentGrid: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
