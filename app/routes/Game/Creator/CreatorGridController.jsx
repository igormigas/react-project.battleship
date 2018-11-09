import React from 'react';
import PropTypes from 'prop-types';

import GridRenderer from '../../../components/Grid/GridRenderer';
import * as utils from '../../../functions/grid';

class CreatorGridController extends React.Component {
  state = {
    hovering: false,
    hoverRow: null,
    hoverCol: null,
    shipHoverStart: null,
    shipHoverEnd: null,
  };

  onMouseEnterSquareHandler = (row, col) => {
    const { grid, deploying, shipHorizontal, shipLength } = this.props;
    this.setState({
      hovering: true,
      hoverRow: row,
      hoverCol: col,
    });
    if (deploying) {
      const cord = shipHorizontal ? col : row;
      const max = shipHorizontal ? grid.countCols() : grid.countRows();
      const offset = Math.round(shipLength / 2 - 1);

      let shipHoverStart = cord - offset;
      if (shipHoverStart < 1) {
        shipHoverStart = 1;
      }
      let shipHoverEnd = shipHoverStart + shipLength - 1;
      if (shipHoverEnd > max) {
        shipHoverEnd = max;
        shipHoverStart = max - shipLength + 1;
      }
      this.setState(prev => ({
        shipHoverStart,
        shipHoverEnd,
      }));
    }
  };

  onMouseLeaveSquareHandler = () => {
    this.setState({
      hovering: false,
    });
  };

  onClickHandler = (row, col) => {
    const { deploying, shipHorizontal, shipPlacementEvent, clickEvent } = this.props;
    const { shipHoverStart } = this.state;

    if (deploying) {
      const originRow = shipHorizontal ? row : shipHoverStart;
      const originCol = shipHorizontal ? shipHoverStart : col;
      console.log(shipHorizontal, row, col, originRow, originCol);
      shipPlacementEvent(originRow, originCol);
    } else {
      clickEvent(row, col);
    }
  };

  isHovered = (row, col) => {
    const { deploying, shipHorizontal } = this.props;
    const { hovering, hoverCol, hoverRow, shipHoverStart, shipHoverEnd } = this.state;

    if (deploying && hovering) {
      const isHorizontal = shipHorizontal;
      if (isHorizontal) {
        if (
          row === hoverRow
          && col >= shipHoverStart
          && col <= shipHoverEnd
        ) {
          return true;
        }
      } else if (
        col === hoverCol
          && row >= shipHoverStart
          && row <= shipHoverEnd
      ) {
        return true;
      }
    }
    return hovering && row === hoverRow && col === hoverCol;
  };

  componentDidMount() {

  }

  render() {
    if (this.props.grid) {
      return (
        <GridRenderer
          grid={this.props.grid}
          isHovered={this.isHovered}
          clickEvent={this.onClickHandler}
          mouseEnterEvent={this.onMouseEnterSquareHandler}
          mouseLeaveEvent={this.onMouseLeaveSquareHandler}
        />
      );
    }
    return null;
  }
}

CreatorGridController.propTypes = {
  grid: PropTypes.object,
  deploying: PropTypes.bool.isRequired,
  shipLength: PropTypes.number,
  shipHorizontal: PropTypes.bool,
  shipPlacementEvent: PropTypes.func.isRequired,
  clickEvent: PropTypes.func.isRequired,
};

export default CreatorGridController;
