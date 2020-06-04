export const state = () => ({
	modalVisible: false,
	modalComponent: null,
	modalType: null
})

export const mutations = {
	/**
	 * @param {state} state 
	 * @param {object} payload - payload.modalName is the name of modal component, payload.modalType use to switch between login and register option
	 */
	showModal(state, payload) {
		state.modalVisible = true;
		state.modalComponent = payload.modalName;
		state.modalType = payload.modalType;
	},
	hideModal(state) {
		state.modalVisible = false;
	},
}