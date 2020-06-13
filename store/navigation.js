export const state = () => ({
	isHamburgerActive: false
})

export const mutations = {
	SET_HAMBURGER(state) {
        state.isHamburgerActive = !state.isHamburgerActive;
    }
}