import '../../services/Facebook';

class authFB {
	fbInitialized = false;

	getLoginStatus(callback) {
		if(typeof(window.FB) === 'undefined') {
			window.fbAsyncInit = () => {
		    if (!this.fbInitialized) {
		    	this._init();
		    }
	    	window.FB.getLoginStatus(response => this._modifyLoginStatus(response, callback));
	    }
	  } else {
	  	window.FB.getLoginStatus(response => this._modifyLoginStatus(response, callback));
	  }
	}

	getUserData(callback) {
			window.FB.api('/me', {fields: 'first_name,last_name,picture'}, callback)
	}

	login(callback) {
		window.FB.login(response => this._modifyLoginStatus(response, callback));
	}

	_init() {
    this.fbInitialized = true;
    window.FB.init({
      appId            : process.env.FACEBOOK_APP_ID,
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.1'
    });
	}

	_modifyLoginStatus(response, callback) {
			const newResponse = {
			...response,
			connected: response.status === 'connected'
		}
		callback(newResponse);
	}
}

export default authFB;
