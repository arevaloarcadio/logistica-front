export default {
	setToken(token) {
		window.localStorage.setItem('jwt_token_reclasin', token);
	},
	getToken() {
		return window.localStorage.getItem('jwt_token_reclasin');
	},
	removeToken() {
		window.localStorage.removeItem('jwt_token_reclasin');
	}
}