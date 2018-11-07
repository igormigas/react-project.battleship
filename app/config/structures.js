import { createNewGrid } from '../functions/grid';

export function initialGameConfig(gameID, userID) {
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
  		[userID]: createNewGrid(9,9),
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
