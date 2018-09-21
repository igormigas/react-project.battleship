import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';
import database from '../../services/firebase/';
import * as utils from '../../functions/grid';

import classes from './Grid.scss';

class Grid extends React.Component {

	constructor(props) {
		super(props);

		this.rowSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
		this.colSymbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		this.workRowSymbols = ['x', ...this.rowSymbols];
		this.workColSymbols = ['y', ...this.colSymbols];
	}


	getSymbolOfSquare = (row, col) => {
		return (row == 'x' ? '' : row) + (col == 'y' ? '' : col);
	}

	getTypeOfSquare = (row, col, fields) => {
		if (row == 'x' || col == 'y') {
			return 'label';
		} else if (!fields) {
			return 'default';
		} else {
			let state = fields[row][col];
			if (state.ship) {
				return state.shot ? 'hit' : 'ship';
			} else {
				return state.shot ? 'missed' : 'default';
			}
		}
	}

	onFireHandler = (row, col) => {
		//database.makeShot(this.props.gameID, this.props.turn, row, col);
	}

	createGrid = (fields) => {
		console.log(fields)
		return fields.forEach((row, x) => {
			row.forEach((state, y) => {
				<Square
					key={utils.intToChar(x+1)+(y+1)}
					row={x}
					col={y}
					state={state}
					fireEvent={this.onFireHandler} />
			})
		})
	}

	render() {
		console.log(this.props)
		return (
			<div className={classes.Grid}>
					{this.createGrid(this.props.fields)}
			</div>
		)
	}
};

Grid.propTypes = {
	fields: PropTypes.array
}

export default Grid;
