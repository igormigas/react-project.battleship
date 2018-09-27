const initialState = {
  topUsers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOP_USERS':
      return {
        ...state,
        topUsers: action.topUsers,
      };

    default:
      return state;
  }
};

export default reducer;
