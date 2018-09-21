import React from 'react';

const facebookButton = (props) => (
	<button
		className="fbLoginButton"
		name="fbLoginSubmit"
		onClick={props.onClickHandler}>
		Log in with Facebook
	</button>
);

export default facebookButton;
