import ajax from "../api"

const barcode = {
  namespaced: true,
  state: {
    modal: false,
  },
  mutations: {
    setModal(state, status) {
      state.modal = status;
    },
  },
  actions: {
    openModal({ commit }) {
      commit("setModal", true);
    },
    closeModal({ commit }) {
      commit("setModal", false);
    },
  },
  getters: {
    getModal(state) {
      return state.modal;
    },
  }
}

export default barcode;