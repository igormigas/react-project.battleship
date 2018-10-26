export function userDetails(uid, userData) {
	const { displayName=null, pictureUrl=null } = userData;
	console.log(pictureUrl);

	return {
		displayName,
		pictureUrl,
	}
}

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
