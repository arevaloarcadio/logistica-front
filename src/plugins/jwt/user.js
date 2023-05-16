export default {
	setUser(user) {
		window.localStorage.setItem('user_reclasin_app', JSON.stringify(user));
	},
	getUser() {
		return window.localStorage.getItem('user_reclasin_app');
	},
	removeUser() {
		window.localStorage.removeItem('user_reclasin_app');
	}
}