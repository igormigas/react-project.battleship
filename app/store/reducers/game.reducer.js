const initialState = {
  gameData: null,
  userGrid: null,
  opponentID: null,
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

    case 'STORE_PLAYERS_GRIDS':
      return {
        ...state,
        userGrid: action.grids.userGrid,
        opponentGrid: action.grids.opponentGrid,
      };

    case 'STORE_OPPONENT_ID':
      return {
        ...state,
        opponentID: action.id,
      };

    default:
      return state;
  }
};

export default reducer;
