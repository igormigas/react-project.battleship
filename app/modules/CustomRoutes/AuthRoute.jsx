import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authRoute = ({
  component: Component, redirectTo, isAuth, ...rest
}) => (
  <Route
    {...rest}
    render={props => (isAuth ? <Component {...props} /> : <Redirect from="/" to={redirectTo} />)}
  />
);

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(authRoute);
