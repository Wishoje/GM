import cookie from 'cookie';
import {setAuthToken, resetAuthToken} from '~/utils/auth';

export const state = () => ({})

export const mutations = {}

export const actions = {
	nuxtServerInit ({dispatch, commit}, context) {
		return new Promise((resolve, reject) => {
			const cookies = cookie.parse(context.req.headers.cookie || '');
			commit('auth/SET_DEFAULT_COOKIE');
			if (cookies.hasOwnProperty('x-access-token')) {
				setAuthToken(cookies['x-access-token']);
				dispatch('auth/fetch').then(result => {
					resolve(true);
				}).catch(error => {
					console.log('Provided token is invalid:', error);
					resetAuthToken();
					resolve(false);
				})
			} else {
				resetAuthToken();
				resolve(false);
			}
		})
	}
}