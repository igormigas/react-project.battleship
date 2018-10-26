import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import database from '../../database';
import { userDetails } from '../../functions/userDataManagement';
// import classes from './Invite.scss'

class Invite extends React.Component {
  state = {
    showInvitation: null,
  };

  componentDidMount() {
    const gameID = this.props.match.params.id;

    database.getGamePlayers(gameID, (response) => {
      console.log(response);
      const playersID = response ? [
        response[0] ? response[0].id : null,
        response[1] ? response[1].id : null,
      ] : [];

      this.analyzePlayersID(response);
    });
  }

  analyzePlayersID = (playersID) => {
    let { userData } = this.props;

    if (userData.id && playersID.hasOwnProperty(userData.id)) {
      this.redirectToGame();
    } else if (Object.keys(playersID).length === 1) {
      this.setState({
        showInvitation: true,
      });
    } else {
      this.setState({
        showInvitation: false,
      });
    }
  }

  onAcceptHandler = () => {
    const { match, userData } = this.props;
    const gid = match.params.id;
    const { uid, ...userCommonData } = userData;
    console.log(userDetails(uid, userCommonData));
    database
      .createOpponent(gid, uid, userDetails(uid, userCommonData))
      .then(this.redirectToGame);
  };

  onRefuseHandler = () => {
    this.props.history.push('/');
  };

  redirectToGame = () => {
    this.props.history.replace(`/game/${this.props.match.params.id}`);
  };

  isOneNull = (...args) => {
    console.log(args);
    // return (args[0] && !args[1]) || (!args[0] && args[1]);
    const nulls = args.reduce((prev, next) => (next === null ? prev + 1 : prev), 0);
    return nulls === 1;
  };

  render() {
    let content;
    switch (this.state.showInvitation) {
      case true:
        content = (
          <div>
          Czy chcesz dołączyć do gry?
            <button onClick={this.onAcceptHandler}>Yes!</button>
            <button onClick={this.onRefuseHandler}>Naah..</button>
          </div>
        );
        break;

      case false:
        content = (
          <div>
          Nie ma, zajęte!
          </div>
        );
        break;

      default:
        content = 'Spinner';
    }

    return (
      <div>
        {content}
      </div>
    );
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
