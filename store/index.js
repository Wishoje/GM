import cookie from 'cookie';
import {setAuthToken, resetAuthToken} from '~/utils/auth';

export const state = () => ({})

export const mutations = {}

export const actions = {
	async nuxtServerInit ({dispatch, commit}, context) {
		return new Promise((resolve, reject) => {
			const cookies = cookie.parse(context.req.headers.cookie || '');
			commit('auth/SET_DEFAULT_COOKIE');
			if (cookies.hasOwnProperty('x-access-token')) {
				try {
					setAuthToken(cookies['x-access-token']);
					await dispatch('auth/fetch');
					resolve(true);
				} catch(err) {
					console.log('Provided token is invalid:', err)  ;                    
					resetAuthToken();
					resolve(false);
				}
			} else {
				resetAuthToken();
				resolve(false);
			}
		})
	}
}