export function transformProviderResponse(response) {
  const { additionalUserInfo, credential, user } = response;
  const isSocialProvider = additionalUserInfo.providerId !== 'password';

  const provider = additionalUserInfo.providerId;
  const isNewUser = additionalUserInfo.isNewUser;
  const uid = user.uid;

  let userData = {
    email: user.email,
  };
  let authData = {};

  if (isSocialProvider) {
    const profile = additionalUserInfo.profile;
    userData = {
      ...userData,
      displayName: profile.first_name + ' ' + profile.last_name,
      firstName: profile.first_name,
      lastName: profile.last_name,
      pictureUrl: profile.picture.data.url,
    };
    authData = {
      ...authData,
      providerUid: profile.id,
      providerName: provider,
      providerAccessToken: credential.accessToken,
    };
  }

  const output = {
    provider,
    isNewUser,
    uid,
    userData,
    authData,
  };
  console.log(output);
  return output;
}

export function applyDisplayName(displayName) {
  return function (response) {
    response.userData.displayName = displayName;
    return response;
  };
}
