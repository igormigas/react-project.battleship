import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import auth from '../../auth';
import database from '../../database';

class AuthHelper extends React.Component {
  authorizedUser = (response) => {
    console.log('[AuthHelper] AUTHORIZING user in Redux', response);
    database.getUserData(response.uid, data => this.props.userAuthenticated(data));
  };

  notAuthorizedUser = (response) => {
    console.log('[AuthHelper] NOT AUTHORIZING user in Redux', response);
    this.props.userNotAuthenticated();
  };

  componentDidMount() {
    console.log('CHECKING AUTH IN FIREBASE');
    auth.checkAuthStatus(this.authorizedUser, this.notAuthorizedUser);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

AuthHelper.propTypes = {
  children: PropTypes.node.isRequired,
  userAuthenticated: PropTypes.func.isRequired,
  userNotAuthenticated: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  userAuthenticated: (payload) => dispatch({ type: 'USER_AUTHENTICATED', payload }),
  userNotAuthenticated: () => dispatch({ type: 'USER_NOT_AUTHENTICATED' }),
});

export default connect(null, mapDispatchToProps)(AuthHelper);
