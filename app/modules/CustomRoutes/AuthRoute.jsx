import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const authRoute = ({
  component: Component, redirectTo, userAuth, ...rest
}) => (
  <Route
    {...rest}
    render={props => (userAuth ? <Component {...props} /> : <Redirect from="/" to={redirectTo} />)}
  />
);

const mapStateToProps = state => ({
  userAuth: state.auth.userAuth,
});

export default connect(mapStateToProps)(authRoute);
