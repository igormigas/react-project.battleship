import { createNewGrid } from '../../functions/grid';

export default class GridContainer {
	constructor(obj = {}, hidden = false) {
		this.Grid = {};
		this.Ships = [];
		this.hidden = hidden;

		if (Object.keys(obj).length) {
			this.install(obj);
		} else {
			this.install(createNewGrid());
		}
	}

	install(obj) {
		this.rows = {
			keys: Object.keys(obj),
		}
		this.cols = {
			keys: Object.keys(obj[1]),
		}

		const rowCount = this.countRows();
		const colCount = this.countCols();

		for (let i=1; i <= rowCount; i++) {
			this.Grid[i] = {};
			for (let j=1; j <= colCount; j++) {
				this.Grid[i][j] = { ...obj[i][j] };
			}
		}
	}

	forRows(callback) {
		return this.rows.keys.map((item, i) => callback(i+1));
	}

	forCols(callback) {
		return this.cols.keys.map((item, i) => callback(i+1));
	}

	getGrid() {
		return this.Grid;
	}

	getFieldDefinition(row, col) {
		return this.Grid[row][col];
	};

	getFieldType(row, col) {
		const def = this.getFieldDefinition(row, col);
		let type = false;

		if (!def.ship) {
			type = !def.shot ? 1 : 2;
		} else {
			type = !def.shot ? 3 : 4;
		}
		if (type === 3 && this.hidden) {
			type = 1;
		}
		return type;
	};

	setField(row, col, obj) {
		this.Grid[row][col] = obj;
		return true;
	}

	updateField(row, col, obj) {
		const field = this.Grid[row][col];
		Object.keys(obj).map(key => {
			field[key] = obj[key];
		})
	}

	putShip(row, col) {
		this.updateField(row, col, {ship: true})
	}

	getRowsKeys() {
		return this.rows.keys;
	}

	getColsKeys() {
		return this.cols.keys;
	}

	countRows() {
		return this.rows.keys.length;
	}

	countCols() {
		return this.cols.keys.length;
	}

	createShip({row, col, shipCords, shipOrientation}) {
		this.Ships.push({ row, col, shipCords, shipOrientation });
		const range = this.range(shipCords.shipStart, shipCords.shipEnd);
		if (shipOrientation) {
			range.map(cord => this.putShip(cord, col));
		} else {
			range.map(cord => this.putShip(row, cord));
		}
		console.log(this.Grid);
	}

	range(start, end) {
	  return Array(end - start + 1).fill().map((_, idx) => start + idx)
	}
}
