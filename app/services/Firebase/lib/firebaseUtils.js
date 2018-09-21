export const combineSets = (obj, firebase) => {
	return Object.keys(obj).reduce( (current, next) => {
		return Object.assign({...current}, obj[next](firebase));
	}, {})
}
