
export function fill(fields, x, y, state) {
  if (Number.isInteger(state)) {
    fields[x - 1][y - 1] = state;
  }
}

export function getInitialGridConfig(assignObject = null) {
  const base = {
    turn: 0,
  };
  assignObject && Object.assign(base.grids, assignObject);

  return base;
}

export function _createNewGrid(x = 9, y = 9) {
  return Array(x).fill(Array(y).fill({
    ship: false,
    shot: false,
  }));
}

export function createNewGrid(x = 9, y = 9) {
  const grid = {};
  for (let i=1; i<=x; i++) {
    grid[i] = {};
    for (let j=1; j<=y; j++) {
      grid[i][j] = {
        ship: false,
        shot: false,
      };
    }
  }
  return grid;
}
