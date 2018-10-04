const providers = firebase => ({
  'facebook.com': firebase.auth.FacebookAuthProvider,
  'google.com': firebase.auth.GoogleAuthProvider,
});

export const getProvider = (firebase, service) => {
  const providersList = providers(firebase);
  if (providersList.hasOwnProperty(service)) {
    return new providersList[service]();
  }
  return null;
};
