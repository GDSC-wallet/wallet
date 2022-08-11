import ajax from "../api";

const debtor = {
  namespaced: true,
  state: {
    debtor: null,
  },
  mutations: {
    setDebtor(state, debtor) {
      state.debtor = debtor;
    }
  },
  actions: {
    async getDebtor(state) {
      ajax("api/debtor/", "get", {}).then(res => {
        commit("setDebtor", res.data.data)
      }).catch((err) => {
        console.log(err);
      })
    },
    setDebtor({ commit }, debtor) {
      commit("setDebtor", debtor)
    },
    async createDebtor({ dispatch }, name) {
      ajax("api/debtor/create", "post", {
        data: {
          debtor_name: name
        }
      }).then(dispatch("update"));
    },
    async deleteDebtor({ dispatch }, id) {
      ajax("api/debtor/delete", "post", {
        data: {
          debtor_id: id
        }
      }).then(dispatch("update"));
    },
    async editDebtor({ dispatch }, deb) {
      ajax("api/debtor/edit", "post", {
        data: {
          debtor_id: deb?.debtor_id,
          debtor_name: deb?.debtor_name
        }
      }).then(dispatch("update"));
    },
    async deleteDebtor({ dispatch }, name) {
      ajax("api/debtor/delete", "post", {
        data: {
          debtor_name: name,
        }
      }).then(dispatch("update"));
    },
    update({ dispatch }) {
      dispatch("auth/getProfile", null, { root: true }).catch((err) => {
        console.log(err);
      })
    },
  },
  getters: {
    getDebtorNames(state) {
      if (state.debtor) return state.debtor.map(item => item.debtor_name);
      return [];
    },
    getDebtor(state) {
      if (state.debtor) return state.debtor;
      return {};
    },
  },
}

export default debtor;