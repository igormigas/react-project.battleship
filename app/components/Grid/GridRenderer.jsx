import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';
import SquareLabel from './SquareLabel';
import * as utils from '../../utils/gridFunctions';
import classes from './Grid.scss';

class GridRenderer extends React.Component {
  renderGrid = () => {
    const { grid } = this.props;

    let header = [];
    for (let i = 0; i <= grid.countCols(); i++) {
      header.push(
        <SquareLabel key={i} value={i > 0 ? i : null} />,
      );
    }
    header = <div key="A0" className={classes.Row}>{header}</div>;

    let body = [];
    grid.forRows(x => {
      body.push(
        <div className={classes.Row} key={utils.intToChar(x)}>
          <SquareLabel key={utils.intToChar(x) + 0} value={utils.intToChar(x)} />
          {grid.forCols(y => (
            <Square
              key={utils.intToChar(x) + (y)}
              row={x}
              col={y}
              type={grid.getFieldType(x, y)}
              hovered={this.props.isHovered(x, y)}
              clickEvent={this.props.clickEvent}
              mouseEnterEvent={this.props.mouseEnterEvent}
              mouseLeaveEvent={this.props.mouseLeaveEvent}
            />
          ))}
        </div>
      );
    });

    return [header, body];
  };

  render() {
    return (
      <div className={classes.Grid}>
        {this.renderGrid()}
      </div>
    );
  }
}

GridRenderer.propTypes = {
  grid: PropTypes.object.isRequired,
  isHovered: PropTypes.func,
  clickEvent: PropTypes.func,
  mouseEnterEvent: PropTypes.func,
  mouseLeaveEvent: PropTypes.func,
};

export default GridRenderer;
