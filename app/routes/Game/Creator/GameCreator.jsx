import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GridControllerCreator from './GridControllerCreator';

import database from '../../../database';
import gridContainer from '../../../components/Grid/GridContainer';

class GameCreator extends React.Component {

  state = {
    fields: null,
    shipList: [],
    deploying: false,
    shipLength: null,
    shipOrientation: false,
    shipNumber: 0,
    shipMaxNumber: 3,
    shipsDeployed: false,
  };

  onClickHandler = (row, col, shipCords=null) => {
    if (this.state.deploying) {
      this.state.gridContainer.createShip({
        row,
        col,
        shipCords,
        shipOrientation: this.state.shipOrientation,
      });
      this.finishShipCreation();
    }
  };

  startShipCreation = () => {
    if (this.state.shipNumber >= this.state.shipMaxNumber) {
      alert('You reached maximum number of ships!');
    } else {
      this.setState(prev => ({
        deploying: true,
        shipLength: Math.round(Math.random()*4)+1,
      }));
    }
  }

  finishShipCreation = () => {
    this.setState(prev => ({
      deploying: false,
      shipLength: null,
      shipNumber: prev.shipNumber + 1,
    }));
    this.setState(prev => ({
      shipsDeployed: prev.shipNumber === prev.shipMaxNumber,
    }));
  }

  cancelShipCreation = () => {
    this.setState(prev => ({
      deploying: false,
      shipLength: null,
    }));
  }

  changeShipOrientation = () => {
    this.setState(prev => ({
      shipOrientation: !prev.shipOrientation,
    }));
  }

  finishDeployment = () => {
    database.savePlayerGrid(
      this.props.gameID,
      this.props.userID,
      this.state.gridContainer.getGrid()
    );
    database.setGameStateDeployed(this.props.gameID, this.props.userID);
  }

  componentDidMount = () => {
    this.setState({
      gridContainer: new gridContainer(),
    });
  };

  render() {
    if (this.state.gridContainer) {
      return (
        <div>
          Create your ships ({this.state.shipNumber}/{this.state.shipMaxNumber}):
          <button onClick={this.startShipCreation}>Start</button>
          <button onClick={this.cancelShipCreation}>Stop</button>
          <button onClick={this.changeShipOrientation}>Stop</button>
          <GridControllerCreator
            gridContainer={this.state.gridContainer}
            deploying={this.state.deploying}
            shipLength={this.state.shipLength}
            shipOrientation={this.state.shipOrientation}
            clickEvent={this.onClickHandler}
          />
          <button onClick={this.finishDeployment} disabled={!this.state.shipsDeployed}>Finish Deployment</button>
        </div>
      );
    }
    return null;
  }
}

GameCreator.propTypes = {
  userID: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  userID: state.auth.uid,
});

export default withRouter(connect(mapStateToProps)(GameCreator));
