import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const unauthRoute = ({
  component: Component, redirectTo, userAuth, ...rest
}) => (
  <Route
    {...rest}
    render={props => (userAuth ? <Redirect from="/" to={redirectTo} /> : <Component {...props} />)}
  />
);

const mapStateToProps = state => ({
  userAuth: state.auth.userAuth,
});

export default connect(mapStateToProps)(unauthRoute);
