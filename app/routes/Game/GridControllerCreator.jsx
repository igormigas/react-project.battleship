import React from 'react';
import PropTypes from 'prop-types';

import Grid from '../../components/Grid';
import * as utils from '../../functions/grid';

class GridControllerCreator extends React.Component {

	state = {
    hovering: false,
    hoverRow: null,
    hoverCol: null,

    shipHoverStart: null,
    shipHoverEnd: null,
  };

  onMouseEnterSquareHandler = (row, col) => {
    this.setState({
      hovering: true,
      hoverRow: row,
      hoverCol: col,
    });
    if (this.props.deploying) {
      const grid = this.props.gridContainer;
      const orientation = this.props.shipOrientation;
      const cord = orientation ? row : col;
      const max = orientation ? grid.countRows() : grid.countCols();
      const length = this.props.shipLength;
      const offset = Math.round(length/2-1);

      let shipHoverStart = cord - offset;
      if (shipHoverStart < 1) {
        shipHoverStart = 1;
      };
      let shipHoverEnd = shipHoverStart + length - 1;
      if (shipHoverEnd > max) {
        shipHoverEnd = max;
        shipHoverStart = max - length + 1;
      };

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

  onClickHandler = (...clickCords) => {
  	if (this.props.deploying) {
  		const shipCords = {
  			shipStart: this.state.shipHoverStart,
  			shipEnd: this.state.shipHoverEnd,
  		};
  		this.props.clickEvent(...clickCords, shipCords);
  	} else {
  		this.props.clickEvent(...clickCords);
  	};
  }

  isHovered = (row, col) => {
    if (this.props.deploying && this.state.hovering) {
    	const orientation = this.props.shipOrientation;
	 		if (orientation) {
	      if (
	        col === this.state.hoverCol
	        && row >= this.state.shipHoverStart
	        && row <= this.state.shipHoverEnd
	      ) {
	        return true;
	      }
	    } else {
	      if (
	        row === this.state.hoverRow
	        && col >= this.state.shipHoverStart
	        && col <= this.state.shipHoverEnd
	      ) {
	        return true;
	      }
	    }
    }
    return this.state.hovering && row === this.state.hoverRow && col === this.state.hoverCol;
	}

	render() {
		return (
			<Grid
				gridContainer={this.props.gridContainer}
			  clickEvent={this.onClickHandler}
			  mouseEnterEvent={this.onMouseEnterSquareHandler}
			  mouseLeaveEvent={this.onMouseLeaveSquareHandler}
			  isHovered={this.isHovered}
			/>
		);
	};
}

GridControllerCreator.propTypes = {
	gridContainer: PropTypes.object.isRequired,
	deploying: PropTypes.bool.isRequired,
	shipLength: PropTypes.number,
	shipOrientation: PropTypes.bool,
  clickEvent: PropTypes.func.isRequired,
}

export default GridControllerCreator;
