const initialState = {
  userAuth: null,
  userID: null,
  userFirstName: null,
  userLastName: null,
  userPicture: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_AUTHENTICATE':
      return {
        ...state,
        userAuth: true,
        userID: action.payload.id,
        userFirstName: action.payload.firstName,
        userLastName: action.payload.lastName,
        userPicture: action.payload.picture,
      };

    case 'USER_NOT_AUTHENTICATE':
      return {
        ...state,
        userAuth: false,
      };

    default:
      return state;
  }
};

export default reducer;
