import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import database from '../../database';

import auth from '../../modules/auth';

class Auth extends React.Component {
  componentDidMount() {
    auth.checkAuthStatus(this.authorizedUser, this.notAuthorizedUser);
  }

  authorizedUser = (response) => {
    console.log('AUTHORIZED USER', response);
    database.updateUser({
      ...response,
      score: 0,
    });
    this.props.userAuthenticated(response);
  };

  notAuthorizedUser = (response) => {
    console.log('NOT AUTHORIZED USER', response);
    this.props.userNotAuthenticated();
  };

  render() {
    return React.Children.only(this.props.children);
  }
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
  userAuthenticated: PropTypes.func.isRequired,
  userNotAuthenticated: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  userAuthenticated: ({
    id, firstName, lastName, picture,
  }) => dispatch({
    type: 'USER_AUTHENTICATE',
    payload: {
      id, firstName, lastName, picture,
    },
  }),
  userNotAuthenticated: () => dispatch({ type: 'USER_NOT_AUTHENTICATE' }),
});

export default connect(null, mapDispatchToProps)(Auth);
