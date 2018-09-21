//
// This script comes from the article
// 'How to do loading spinners, the React way.'
// (http://www.codetunnel.io/how-to-create-versatile-loading-spinner-management-in-react/)
// by Chev, published 2 dec 2017
//
// I modified and adjusted it to my need.
//

class spinnerService {
	
	constructor() {
		this.cache = new Set();
	}

	register(instance) {
		this.cache.add(instance);
	}

	unregister(instance) {
		this.cache.forEach( spinner => {
			if (spinner === instance) {
				this.cache.delete(spinner);
			}
		})
	}

	show(name) {
		this.cache.forEach( spinner => {
			if (spinner.name === name) {
				spinner.show();
			}
		})
	}

	hide(name) {
		this.cache.forEach( spinner => {
			if (spinner.name === name) {
				spinner.hide();
			}
		})
	}

	isShowing(name) {
		this.cache.forEach( spinner => {
			if (spinner.name === name) {
				return true
			}
		});
		return false;
	}
}

export default new spinnerService;