import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GameLauncher from './GameLauncher';

import database from '../../database';
import { getInitialGridConfig, createNewGrid } from '../../functions/initial';

class GameDispatcher extends Component {
  state = {
    gameID: null,
    gameCreated: false,
    gameInitialized: false,
  };

  componentDidMount() {
    this.theLoop(this.props.match.params.id);
  }

  componentDidUpdate() {
    if (!this.state.gameInitialized) {
      this.theLoop(this.props.match.params.id);
    }
  }

  redirect = (path) => {
    this.props.history.replace(path);
  }

  getInitialGameConfig(gameID) {
    const timestamp = Date.now();
    const config = {};

    config.details = {
      id: gameID,
      time: {
        created: timestamp,
        modified: timestamp,
      },
    };

    config.grids = {
      [this.props.userID]: createNewGrid(9,9),
    }

    config.state = {
      created: true,
      deployed: {
        [this.props.userID]: false,
      },
    }

    config.details.players = {
      [this.props.userID]: {
        displayName: this.props.userData.displayName,
        pictureUrl: this.props.userData.pictureUrl,
      },
    };
    return Object.assign(getInitialGridConfig(), config);
  }

  getPlayers(obj) {
    return Object.keys(obj).map(key => {
      return key;
    });
  }

  dispatchGameConfig(gameConfig) {
    const playersID = this.getPlayers(gameConfig.players);

    if (playersID.includes(this.props.userID)) {
      console.log('PLAY');
      this.setState({
        gameInitialized: true,
        gameID: gameConfig.id,
      });
    } else if (playersID.length === 1) {
      console.log('DO YOU WANNA PLAY ?');
      this.redirect(`/invite/${gameConfig.id}`);
    } else if (playersID.length === 2) {
      console.log('PRIVATE GAME');
      this.redirect(`/info/private_game`);
    } else {
      console.log('ERROR DISPATCH');
      this.redirect(`/info/game_error`);
    }
  }

  createNewGameAndRedirect() {
    const gameID = database.getNewGameKey();
    const gameConfig = this.getInitialGameConfig(gameID);
    database.createNewGame(gameID, gameConfig);
    database.registerUser(gameID, this.props.userID);

    this.setState({
      gameCreated: gameID,
    });
    this.redirect(`/game/${gameID}`);
  }

  theLoop(urlGameID) {
    if (urlGameID) {
      database.checkGameExist(urlGameID, (result) => {
        if (!result.exists()) {
          this.createNewGameAndRedirect();
        } else {
          const gameConfig = result.val();
          this.dispatchGameConfig(gameConfig);
        }
      });
    } else {
      this.createNewGameAndRedirect();
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
