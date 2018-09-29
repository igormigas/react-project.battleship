import auth from '../../services/firebase/auth';

class authFirebase {

  getLoginStatus(callback) {
    auth.onAuthStateChanged(function(response) {
      const newResponse = {
        ...response,
        connected: response || false
      }
      callback(newResponse)
    });
  }

  getUserData(callback) {
    const user = auth.currentUser;
    callback(user);
  }

  signin(provider ) {

  }

  login(callback) {
    provider = new authacebookAuthProvider();
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  _init() {
    this.fbInitialized = true;
    window.FB.init({
      appId: process.env.FACEBOOK_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v3.1',
    });
  }

  _modifyLoginStatus(response, callback) {
    const newResponse = {
      ...response,
      connected: response.status === 'connected',
    };
    callback(newResponse);
  }

  _filterUserData(data) {
    return {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      picture: data.picture.data,
    };
  }
}

export default authFirebase;
