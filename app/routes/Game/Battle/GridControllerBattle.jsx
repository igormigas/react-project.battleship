import React from 'react';
import PropTypes from 'prop-types';

import Grid from '../../../components/Grid';
import * as utils from '../../../functions/grid';

class GridControllerBattle extends React.Component {
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
	}

	render() {
		return (
			<Grid
				gridContainer={this.props.gridContainer}
			  clickEvent={this.props.clickEvent}
			  mouseEnterEvent={this.onMouseEnterSquareHandler}
			  mouseLeaveEvent={this.onMouseLeaveSquareHandler}
			  isHovered={this.isHovered}
			/>
		);
	};
}

GridControllerBattle.propTypes = {
	gridContainer: PropTypes.object,
  clickEvent: PropTypes.func.isRequired,
}

export default GridControllerBattle;
