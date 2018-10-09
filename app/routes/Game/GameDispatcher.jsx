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

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.gameInitialized) {
      this.theLoop(this.props.match.params.id);
    }
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

  createNewGameAndRedirect() {
    const gameID = database.getNewGameKey();
    const gameConfig = this.getInitialGameConfig(gameID);
    database.createNewGame(gameID, gameConfig);
    database.registerUser(gameID, this.props.userID);

    this.setState({
      gameCreated: gameID,
    });
    this.props.history.replace(`/game/${gameID}`);
  }

  dispatchGameConfig(gameConfig) {
    const players = gameConfig.players;
    const playersID = Object.keys(players).map(key => {
      return key;
    });

    if (playersID.includes(this.props.userID)) {
      console.log('PLAY');
      this.setState({
        gameInitialized: true,
        gameID: gameConfig.id,
      });
    } else if (playersID.length === 1) {
      console.log('DO YOU WANNA PLAY ?');
      this.props.history.replace(`/invite/${gameConfig.id}`);
    } else if (playersID.length === 2) {
      console.log('PRIVATE GAME');
    } else {
      console.log('ERROR, PROBABLY BOTH NULL, PROBLEM WITH CREATING NEW GAME');
    }
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

export default connect(mapStateToProps)(withRouter(GameDispatcher));
