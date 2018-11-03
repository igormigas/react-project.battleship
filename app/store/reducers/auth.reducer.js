const initialState = {
  isAuth: null,
  data: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_AUTHENTICATED':
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };

    case 'USER_NOT_AUTHENTICATED':
      return {
        isAuth: false,
        data: null,
      };

    default:
      return state;
  }
};

export default reducer;
