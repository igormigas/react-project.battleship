import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const unauthRoute = ({
  component: Component, redirectTo, isAuth, ...rest
}) => (
  <Route
    {...rest}
    render={props => (isAuth ? <Redirect from="/" to={redirectTo} /> : <Component {...props} />)}
  />
);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(unauthRoute);
