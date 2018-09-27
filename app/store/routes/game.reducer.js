const initialState = {
  gameData: null,
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

    default:
      return state;
  }
};

export default reducer;
