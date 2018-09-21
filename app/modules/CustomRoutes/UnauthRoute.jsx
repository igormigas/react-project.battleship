import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const unauthRoute = ({component: Component, redirectTo, userAuth, ...rest}) => {
	return (
		<Route
			{...rest}
			render={ props => {
				return userAuth ? <Redirect from="/" to={redirectTo} /> : <Component {...props} />
			}} />
	)
}

const mapStateToProps = state => {
	return {
		userAuth: state.auth.userAuth
	}
}

export default connect(mapStateToProps)(unauthRoute);
