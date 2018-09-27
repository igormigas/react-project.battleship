const functions = database => ({
  checkGameExist: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details`)
      .once('value')
      .then(snapshot => callback(snapshot));
  },

  getGameDetails: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details`)
      .once('value')
      .then(snapshot => callback(snapshot));
  },

  getGamePlayers: (gameID, callback) => {
    database
      .ref(`/games/${gameID}/details/players`)
      .once('value')
      .then(snapshot => callback(snapshot));
  },

  getNewGameKey: () => {
    const ref = database.ref('/games');
    const key = ref.push().key;
    return key;
  },

  createNewGame: (gameID, obj) => database
    .ref('/games')
    .child(gameID)
    .set(obj),

  createOpponent: (gameID, slot, obj) => database
    .ref(`/games/${gameID}/details/players/${slot}`)
    .update(obj),

  listenGameData: (gameID, callback) => {
    database
      .ref(`/games/${gameID}`)
      .on('value', snapshot => callback(snapshot));
  },


  makeShot: (gameID, player, row, col) => {
    const updates = {};
    const opponent = player ? 0 : 1;
    updates[`/grids/${player}/fields/${row}/${col}`] = 2;
    updates['/turn'] = opponent;
    database
      .ref(`/games/${gameID}`)
      .update(updates);
  },

  updateGameField: (gameID, row, col) => {
    database
      .ref(`/games/${gameID}/fields/${row}/${col}`)
      .update({
        shot: 'true',
      });
  },
});

export default functions;
