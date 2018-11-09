import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CreatorGridController from './CreatorGridController';

import GameController from '../../../utils/GameController';
import database from '../../../database';

class GameCreator extends React.Component {
  constructor(props) {
    super(props);

    this.controller = new GameController();
    this.controller.startShipsDeployment();
  }

  state = {
    shipList: [],
    deploying: false,
    shipsDeployed: false,
    shipLength: null,
    shipHorizontal: true,
    shipNumber: 0,
    shipMaxNumber: 3,
  };

  onClickHandler = (row, col) => {
    console.log('click');
  };

  onShipPlaceHandler = (oRow, oCol) => {
    const { deploying, shipLength, shipHorizontal } = this.state;
    if (deploying) {
      this.controller.createNewShip(oRow, oCol, shipLength, shipHorizontal);
      this.finishShipCreation();
    }
  };

  startShipCreation = () => {
    if (this.state.shipNumber >= this.state.shipMaxNumber) {
      alert('You reached maximum number of ships!');
    } else {
      this.setState(prev => ({
        deploying: true,
        shipLength: Math.round(Math.random() * 4) + 1,
      }));
    }
  };

  changeShipOrientation = () => {
    this.setState(prev => ({
      shipHorizontal: !prev.shipHorizontal,
    }));
  };

  finishShipCreation = () => {
    this.setState(prev => ({
      deploying: false,
      shipLength: null,
      shipNumber: prev.shipNumber + 1,
    }));
    this.setState(prev => ({
      shipsDeployed: prev.shipNumber === prev.shipMaxNumber,
    }));
  };

  cancelShipCreation = () => {
    this.setState({
      deploying: false,
      shipLength: null,
    });
  };

  finishDeployment = () => {
    const { gameID, userID } = this.props;
    const controller = this.controller;
    const grid = controller.exportUserGrid();
    const ships = controller.exportUserShips();

    database.savePlayerFleet(gameID, userID, grid, ships);
    database.setGameStateDeployed(gameID, userID);
  };

  componentDidMount = () => {
  };

  render() {
    console.warn(this.controller);
    return (
      <div>
        Create your ships ({this.state.shipNumber}/{this.state.shipMaxNumber}):
        <button onClick={this.startShipCreation}>Start</button>
        <button onClick={this.cancelShipCreation}>Stop</button>
        <button onClick={this.changeShipOrientation}>Stop</button>
        <CreatorGridController
          grid={this.controller.getUserGrid()}
          deploying={this.state.deploying}
          shipLength={this.state.shipLength}
          shipHorizontal={this.state.shipHorizontal}
          shipPlacementEvent={this.onShipPlaceHandler}
          clickEvent={this.onClickHandler}
        />
        <button onClick={this.finishDeployment} disabled={!this.state.shipsDeployed}>Finish Deployment</button>
      </div>
    );
  }
}

GameCreator.propTypes = {
  userID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userID: state.auth.uid,
});

export default withRouter(connect(mapStateToProps)(GameCreator));
