import {setAuthToken, resetAuthToken} from '~/utils/auth';
import cookies from 'js-cookie';

export const state = () => ({
	user: null,
	isLoggedIn: false
})

export const mutations = {
	SET_USER(state, data) {
		state.user = data;
		state.isLoggedIn = true;
	},
	RESET_USER(store) {
		state.user = null;
		state.isLoggedIn = false;
	}
}

export const actions = {
	async fetch ({commit}) {
        const result = await this.$axios.$get('/api/me');
		if (result) {
			commit('SET_USER', result);
		} else {
			commit('RESET_USER');
			resetAuthToken();
			cookies.remove('x-access-token');
		}
	},
	async login({commit}, data) {
		const result = await this.$axios.$post('/api/login', data);
		if (result && result.data) {
			commit('SET_USER', result.data);
			setAuthToken(result.data.userAuth.token);
			cookies.set('x-access-token', result.data.userAuth.token, {expires: 30});
		}
	},
	async register({commit}, data) {
		const result = await this.$axios.$post('/api/register', data);
		if (result) {
			commit('SET_USER', result.data);
		}
	},
	async reset({commit}, data) {
		const result = await this.$axios.$post('/api/logout', data);
		if (result) {
			commit('RESET_USER');
			resetAuthToken();
			cookies.remove('x-access-token');
		}
	}
}