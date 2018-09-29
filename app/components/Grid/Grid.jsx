import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';
import SquareLabel from './SquareLabel';
import database from '../../services/Firebase';
import * as utils from '../../functions/grid';

import classes from './Grid.scss';

class Grid extends React.Component {
  state = {
    hovering: false,
    hoverRow: null,
    hoverCol: null,
  };

  onClickHandler = (row, col) => {
    this.props.clickEvent(this.props.player, row, col);
  };

  onMouseEnterSquareHandler = (row, col) => {
    this.arrao(row, 4);
    this.setState({
      hovering: true,
      hoverRow: row,
      hoverCol: col,
    });
  };

  onMouseLeaveSquareHandler = () => {
    this.setState({
      hovering: false,
    });
  };

  isHovered(x, y) {
    return this.state.hovering && x === this.state.hoverRow && y === this.state.hoverCol;
  }

  arrao(cord, size) {
    console.log(cord, size);
    const start = cord - Math.floor((size-1)/2);
    console.log(start);
    return Array(size).fill(start).map((val, i) => val + i);
  }

  createGrid = (fields) => {
    const header = [];
    const countCols = fields[0].length;
    for (let i = 0; i <= countCols; i++) {
      header.push(
        <SquareLabel key={i} value={i > 0 ? i : null} />,
      );
    }
    return [
      <div key="A0" className={classes.Row}>{header}</div>,
      fields.map((row, x) => (
        <div className={classes.Row} key={utils.intToChar(x + 1)}>
          <SquareLabel key={utils.intToChar(x + 1) + 0} value={utils.intToChar(x + 1)} />
          {row.map((type, y) => (
            <Square
              key={utils.intToChar(x + 1) + (y + 1)}
              row={x + 1}
              col={y + 1}
              type={type}
              hovered={this.isHovered(x + 1, y + 1)}
              clickEvent={this.onClickHandler}
              mouseEnterEvent={this.onMouseEnterSquareHandler}
              mouseLeaveEvent={this.onMouseLeaveSquareHandler}
            />
          ))}
        </div>
      )),
    ];
  };

  render() {
    return (
      <div className={classes.Grid}>
        {this.createGrid(this.props.fields)}
      </div>
    );
  }
}

Grid.propTypes = {
  player: PropTypes.number.isRequired,
  fields: PropTypes.array,
  active: PropTypes.bool,
  clickEvent: PropTypes.func.isRequired,
  mouseEnterEvent: PropTypes.func.isRequired,
  mouseLeaveEvent: PropTypes.func.isRequired,
};

export default Grid;
