import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UserProfileComponent from './UserProfileComponent';

class UserProfile extends React.Component {
  onLogoutHandler = () => {
    this.props.history.push('/auth/logout');
  };

  render() {
    if (this.props.isAuth && this.props.userData) {
      const { displayName, firstName, lastName, pictureUrl } = this.props.userData;
      return (
        <UserProfileComponent
          displayName={displayName}
          pictureUrl={pictureUrl || 'https://robohash.org/' + this.props.userID}
          onLogoutEvent={this.onLogoutHandler}
        />
      );
    }
    return null;
  }
}

UserProfile.propTypes = {
  isAuth: PropTypes.bool,
  userData: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  userID: state.auth.uid,
  userData: state.auth.userData,
});

export default withRouter(connect(mapStateToProps)(UserProfile));
