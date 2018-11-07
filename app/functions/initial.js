
export function fill(fields, x, y, state) {
	if (Number.isInteger(state)) {
		fields[x - 1][y - 1] = state;
	}
}

/*
export function _createNewGrid(x = 9, y = 9) {
	return Array(x).fill(Array(y).fill({
		ship: false,
		shot: false,
	}));
}
*/



export function initialUser(obj) {
	const result = {};
	result[obj.uid] = {};
	const user = result[obj.uid];

	if (obj.displayName) {
		user['displayName'] = obj.displayName;
	}
	if (obj.pictureUrl) {
		user['pictureUrl'] = obj.pictureUrl;
	}

	return result;
}


