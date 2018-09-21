import React from 'react';

const facebookProfile = (props) => {
	return (
		<div className="fbProfile">
			<div className="fbPhoto">
				<img src={props.image} alt={props.name} />
			</div>
			<h3>Hello {props.name}!</h3>
		</div>
	);
};

export default facebookProfile;
