const initialState = {
  isAuth: null,
  data: {},
};

/*
const flattenUserData = data => {
  return {
    uid:                  data.uid,
    firstName:            data.profile.firstName,
    lastName:             data.profile.lastName,
    email:                data.profile.email,
    picture:              data.profile.picture,
    providerUid:          data.authProvider.providerUid,
    providerName:         data.authProvider.providerName,
    providerAccessToken:  data.authProvider.providerAccessToken,
    score:                data.score
  };
}; */

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
