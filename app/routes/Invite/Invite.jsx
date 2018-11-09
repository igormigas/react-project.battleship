import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InviteError from './components/InviteError';
import InviteJoin from './components/InviteJoin';

import database from '../../database';
import { userDetails } from '../../functions/userDataManagement';
// import classes from './Invite.scss'

class Invite extends React.Component {
  state = {
    showInvitation: null,
  };

  showInvitation = () => {
    this.setState({ showInvitation: true });
  };

  showError = () => {
    this.setState({ showInvitation: false });
  };

  redirectToGame = () => {
    const gameID = this.props.match.params.id;
    this.props.history.replace(`/game/${gameID}`);
  };

  redirectToLobby = () => {
    this.props.history.push('/');
  };

  onAcceptHandler = () => {
    const { match, userData } = this.props;
    const gameID = match.params.id;
    const { uid, ...userCommonData } = userData;
    database
      .createOpponent(gameID, uid, userDetails(uid, userCommonData))
      .then(this.redirectToGame);
  };

  onRefuseHandler = () => {
    this.redirectToLobby();
  };

  onConfirmHandler = () => {
    this.redirectToLobby();
  };

  processGamePlayers = (gamePlayers) => {
    const { userData } = this.props;
    const playersID = gamePlayers ? Object.keys(gamePlayers) : [];
    console.warn(playersID, userData.uid);
    if (userData.uid && playersID[userData.uid]) {
      this.redirectToGame();
    } else if (playersID.length === 1) {
      this.showInvitation();
    } else {
      this.showError();
    }
  };

  componentDidMount() {
    const gameID = this.props.match.params.id;
    database.getGamePlayers(gameID, this.processGamePlayers);
  }

  render() {
    switch (this.state.showInvitation) {
      case true:
        return (
          <InviteJoin
            onAcceptHandler={this.onAcceptHandler}
            onRefuseHandler={this.onRefuseHandler}
          />
        );
      case false:
        return (
          <InviteError
            text="Eoeoeo"
            onConfirmHandler={this.onConfirmHandler}
          />
        );
      default:
        return 'Spinner';
    }
  }
}

Invite.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userData: PropTypes.object,
};

const mapStateToProps = state => ({
  userData: {
    uid: state.auth.uid,
    ...state.auth.userData,
  },
});

export default connect(mapStateToProps)(Invite);
