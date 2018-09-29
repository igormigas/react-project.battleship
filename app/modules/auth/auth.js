import authFB from './authFB';
import authFirebase from './authFirebase';

class auth {
  service = new authFirebase();

  checkAuthStatus(successCallback, failCallback = null) {
    this.service.getLoginStatus(response => (
      this.switchResponseStatus(response, successCallback, failCallback)
    ));
  }

  switchResponseStatus(response, successCallback, failCallback = null) {
    if (response.connected) {
      this.service.getUserData(successCallback);
    } else if (failCallback) {
      failCallback(response);
    } else {
      console.log('Authorization failure (without callback)');
    }
  }

  signup(email, password, successCallback, failCallback) {

  }

  login(successCallback, failCallback = null) {
    this.service.login(response => (
      this.switchResponseStatus(response, successCallback, failCallback)
    ));
  }

  getRandomID(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

const instance = new auth();

export default instance;
