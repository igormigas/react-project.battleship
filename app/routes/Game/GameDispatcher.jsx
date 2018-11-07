import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GameLauncher from './GameLauncher';

import database from '../../database';
import { getInitialGameConfig } from '../../config/structures';

class GameDispatcher extends Component {
  state = {
    gameID: null,
    gameCreated: false,
    gameInitialized: false,
  };

  redirect = (path) => {
    this.props.history.replace(path);
  }

  launchGame(gameID) {
    this.setState({
      gameID,
      gameInitialized: true,
    });
  }

  dispatchGame(gameConfig) {
    const { userID } = this.props;
    const gameID = gameConfig.id;
    const playersID = Object.keys(gameConfig.players);

    if (playersID.includes(userID)) {
      this.launchGame(gameID);
    } else if (playersID.length === 1) {
      this.redirect(`/invite/${gameID}`);
    } else if (playersID.length === 2) {
      this.redirect(`/info/private_game`);
    } else {
      this.redirect(`/info/game_error`);
    }
  }

  createNewGameAndRedirect() {
    const { userID } = this.props;
    const gameID = database.getNewGameKey();
    const gameConfig = getInitialGameConfig(gameID, userID);

    database.createNewGame(gameID, userID, gameConfig);

    this.setState({ gameCreated: gameID });
    this.redirect(`/game/${gameID}`);
  }

  theLoop() {
    const urlGameID = this.props.match.params.id;

    if (urlGameID) {
      database.checkGameExist(urlGameID, (config) => {
        if (!config) {
          this.createNewGameAndRedirect();
        } else {
          this.dispatchGame(config);
        }
      });
    } else {
      this.createNewGameAndRedirect();
    }
  }

  componentDidMount() {
    this.theLoop();
  }

  componentDidUpdate() {
    if (!this.state.gameInitialized) {
      this.theLoop();
    }
  }

  render() {
    return this.state.gameInitialized ? <GameLauncher gameID={this.state.gameID} /> : null;
  }
}

GameDispatcher.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  userData: PropTypes.object,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
  userData: state.auth.isAuth ? state.auth.userData : null,
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GameDispatcher));
