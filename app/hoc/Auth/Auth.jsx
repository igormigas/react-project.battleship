import React from 'react';
import { connect } from 'react-redux';
import database from '../../services/firebase/';

import auth from '../../modules/auth';

class Auth extends React.Component {

  componentDidMount() {
    auth.checkAuthStatus(this.authorizedUser, this.notAuthorizedUser);
  }

  authorizedUser = (response) => {
    console.log('AUTHORIZED USER', response);
    database.updateUser({
      ...response,
      score: 0
    });
    this.props.userAuthenticated(response);
  }

  notAuthorizedUser = (response) => {
    console.log('NOT AUTHORIZED USER', response);
    this.props.userNotAuthenticated();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userAuthenticated: ( {id, first_name, last_name, picture} ) => dispatch({type: 'USER_AUTHENTICATE', payload: {id, first_name, last_name, picture}}),
    userNotAuthenticated: () => dispatch({type: 'USER_NOT_AUTHENTICATE'})
  }
}

export default connect(null, mapDispatchToProps)(Auth);
