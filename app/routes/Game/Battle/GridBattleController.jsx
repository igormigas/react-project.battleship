import React from 'react';
import PropTypes from 'prop-types';

import GridRenderer from '../../../components/Grid/GridRenderer';
import * as utils from '../../../functions/grid';

class GridBattleController extends React.Component {
  state = {
    hovering: false,
    hoverRow: null,
    hoverCol: null,
  };

  onMouseEnterSquareHandler = (row, col) => {
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

  isHovered = (row, col) => {
    return this.state.hovering && row === this.state.hoverRow && col === this.state.hoverCol;
  };

  render() {
    return (
      <GridRenderer
        grid={this.props.grid}
        clickEvent={this.props.clickEvent}
        mouseEnterEvent={this.onMouseEnterSquareHandler}
        mouseLeaveEvent={this.onMouseLeaveSquareHandler}
        isHovered={this.isHovered}
      />
    );
  }
}

GridBattleController.propTypes = {
  grid: PropTypes.object.isRequired,
  clickEvent: PropTypes.func,
};

export default GridBattleController;
