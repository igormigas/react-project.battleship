import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authRoute = ({component: Component, redirectTo, userAuth, ...rest}) => {
	return (
		<Route
			{...rest}
			render={ props => {
				return userAuth ? <Component {...props} /> : <Redirect from="/" to={redirectTo} />
			}} />
	)
}

const mapStateToProps = state => {
	return {
		userAuth: state.auth.userAuth
	}
}

export default connect(mapStateToProps)(authRoute);
