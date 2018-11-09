import config from '../config/game';

export default class GridContainer {
  constructor(grid) {
    this.grid = grid || this.createNewGrid(config.gridSize, config.gridSize);

    this.size = this.grid.filter(Boolean).length;
  }

  getField(row, col) {
    return this.grid[row][col];
  }

  isFieldShot(row, col) {
    return this.grid[row][col].shot;
  }

  setFieldAsShot(row, col) {
    this.grid[row][col].shot = true;
  }

  setFieldAsShip(row, col) {
    this.grid[row][col].ship = true;
  }

  // TODO
  getFieldType(row, col) {
    const def = this.getField(row, col);
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
  }

  createNewGrid(x = 9, y = 9) {
    const grid = [];
    for (let i = 1; i <= x; i++) {
      grid[i] = [];
      for (let j = 1; j <= y; j++) {
        grid[i][j] = { shot: false, ship: false };
      }
    }
    return grid;
  }

  countRows() {
    return this.size;
  }

  countCols() {
    return this.size;
  }

  forRows(callback) {
    return this.grid.map((item, i) => callback(i));
  }

  forCols(callback) {
    return this.grid[1].map((item, i) => callback(i));
  }

  getClonedGrid() {
    const grid = {};
    for (let [k, v] in this.grid.entries()) {
      grid[k] = { ...this.grid[k] };
    }
    return grid;
  }

  clear() {
    this.grid = [];
  }

  export() {
    return this.grid;
  }
}
