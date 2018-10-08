const functions = database => ({

	getUserActiveGames: (uid, callback) => {
    database
      .ref('/games')
      .orderByChild('details/players/0/id')
      .equalTo(uid)
      .once('value')
      .then(snapshot => {
        const array = [];
        snapshot.forEach(childSnap => {
          const child = childSnap.val();
          array.push({
            gid: child.details.id,
          });
        });
        callback(array);
      });
  },
});

export default functions;
