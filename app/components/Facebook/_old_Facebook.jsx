/*
import React from 'react';
import { connect } from 'react-redux';
import database from '../../services/firebase';

import FacebookProfile from './FacebookProfile';
import FacebookButton from './FacebookButton';
import '../../services/Facebook';

class Facebook extends React.Component {
  userConnected() {
    this.fbGetUserData().then((response) => {
      database.updateUser({
        ...response,
        score: 0,
      });
    });
  }


  render() {
    return (
      <div className="FacebookBar">
        { this.props.userAuth ? (
          <FacebookProfile
            name={this.props.userName}
            image={this.props.userPicture.data.url}
          />
        ) : <FacebookButton onClickHandler={this.onLoginHandler} /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userAuth: state.auth.userAuth,
  userID: state.auth.userID,
  userName: state.auth.userName,
  userPicture: state.auth.userPicture,
});

export default connect(mapStateToProps)(Facebook);
*/
