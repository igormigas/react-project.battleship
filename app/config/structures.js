import { createNewGrid } from '../utils/gridFunctions';

export function getInitialGameConfig(gameID, userID) {
  const timestamp = Date.now();

  return {
    details: {
      id: gameID,
      players: {
        [userID]: true,
      },
      time: {
        created: timestamp,
        modified: timestamp,
      },
    },
    grids: {
      [userID]: createNewGrid(9, 9),
    },
    state: {
      created: true,
      deployed: {
        [userID]: false,
      },
    },
    nextShooterID: userID,
  };
}
