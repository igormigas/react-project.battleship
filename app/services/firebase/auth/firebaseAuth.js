import firebase from '../firebaseInit';
import 'firebase/auth';
import { getProvider } from './firebaseAuthProviders';
import { transformProviderResponse, applyDisplayName } from './firebaseAuthResponse';

class firebaseAuth {
  checkAuthStatus(successCallback, failCallback = null) {
    firebase.auth().onAuthStateChanged(response => {
      if (response) {
        successCallback({ uid: response.uid });
      } else {
        failCallback(response);
      }
    });
  }

  getCurrentUserData(callback) {
    const user = firebase.auth().currentUser;
    callback(user);
  }

  signUpWithEmail(username, email, password, successCallback, failCallback) {
    console.log('PASSWORD SIGNUP');
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(transformProviderResponse)
      .then(applyDisplayName(username))
      .then(successCallback)
      .catch(failCallback);
  }

  signInWithEmail(email, password, successCallback, failCallback) {
    console.log('PASSWORD LOGIN');
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(transformProviderResponse)
      .then(successCallback)
      .catch(failCallback);
  }

  loginWithService(service, successCallback, failCallback) {
    console.log('SERVICE LOGIN');
    const provider = getProvider(firebase, service);
    firebase.auth().signInWithPopup(provider)
      .then(transformProviderResponse)
      .then(successCallback)
      .catch(failCallback);
  }

  logout(successCallback = null) {
    firebase.auth().signOut()
      .then(successCallback)
      .catch(error => console.log(error));
  }
}

const instance = new firebaseAuth();
export default instance;
