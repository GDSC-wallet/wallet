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
    async getDebtor() {
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
    async editDebtor({ getters, dispatch }, debName) {
      let tmp = getters.getDebtor.find(deb => deb.debtor_name == debName.pre)
      ajax("api/debtor/edit", "post", {
        data: {
          debtor_id: tmp.debtor_id,
          debtor_name: debName.cur
        }
      }).then(dispatch("update"));
    },
    async deleteDebtor({ dispatch }, id) {
      ajax("api/debtor/delete", "post", {
        data: {
          debtor_id: id,
        }
      }).then(dispatch("update"));
    },
    update({ dispatch }) {
      dispatch("auth/getProfile", null, { root: true }).catch((err) => {
        console.log(err);
      })
    },
    getDebtorId({ getters }, str) {
      let tmp = getters.getDebtor.find(deb => deb.debtor_name == str)
      return tmp.debtor_id;
    }
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