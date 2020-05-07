export const state = () => ({
  modalVisible: false,
  modalComponent: null,
})

export const mutations = {
  showModal(state, componentName) {
    state.modalVisible = true;
    state.modalComponent = componentName;
    console.log('showModal store / state.modalComponent:', state.modalComponent);
  },
  hideModal(state) {
    console.log('hideModal store / state:', state);
    state.modalVisible = false;
  },
}