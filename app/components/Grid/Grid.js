import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';
import SquareLabel from './SquareLabel';
import database from '../../services/firebase/';
import * as utils from '../../functions/grid';

import classes from './Grid.scss';

class Grid extends React.Component {

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
		let header = [];
		const countRows = fields.length;
		const countCols = fields[0].length;
		for (let i=0; i<=countCols; i++) {
			console.log(i>0 && i)
			header.push(
				<SquareLabel key={i} value={i>0?i:null} />
			);
		}
		return [
			<div key="A0" className={classes.Row}>{header}</div>,
			fields.map((row, x) => {
				return (
					<div className={classes.Row} key={utils.intToChar(x+1)}>
						<SquareLabel key={utils.intToChar(x+1)+0} value={utils.intToChar(x+1)} />
						{row.map((state, y) => {
							return (
								<Square
									key={utils.intToChar(x+1)+(y+1)}
									row={x+1}
									col={y+1}
									state={state}
									fireEvent={this.onFireHandler} />
							);
						})}
					</div>
				);
			})
		];
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
