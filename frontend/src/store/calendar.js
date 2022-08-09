const calendar = {
  namespaced: true,
  state: {
    date: new Date(),
    currentMax: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    currentMin: new Date(new Date().setMonth(new Date().getMonth() - 2)),
  },
  mutations: {
    setDate(state, newDate) {
      state.date = newDate;
    },
    setCurrentMax(state, newDate) {
      state.currentMax = newDate;
    },
    setCurrentMin(state, newDate) {
      state.currentMin = newDate;
    }
  },
  actions: {
    setDate({ commit, state, dispatch }, newDate) {
      // Still finding solution to lazy load
      commit("setDate", newDate);
      let currentMax = state.currentMax;
      let currentMin = state.currentMin;
      if (newDate >= currentMax || newDate <= currentMin) {
        commit("setCurrentMax", new Date(new Date(newDate).setMonth(newDate.getMonth() + 3)));
        commit("setCurrentMin", new Date(new Date(newDate).setMonth(newDate.getMonth() - 2)));
        dispatch("wallet/getWallet", null, { root: true })
      }
    }
  },
  getters: {
    getDate(state) {
      return state.date;
    }
  }
}

export default calendar;