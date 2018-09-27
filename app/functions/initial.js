
export function fill(fields, x, y, state) {
  if (Number.isInteger(state)) {
    fields[x - 1][y - 1] = state;
  }
}

export function getInitialGridConfig(assignObject = null) {
  const base = {
    turn: 0,
    grids: {
      0: {
        fields: createNewGrid(9, 9),
      },
      1: {
        fields: createNewGrid(9, 9),
      },
    },
  };
  assignObject && Object.assign(base.grids, assignObject);

  return base;
}

export function createNewGrid(x = 3, y = 3) {
  return Array(x).fill(Array(y).fill(0));
}
