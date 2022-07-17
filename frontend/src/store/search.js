import ajax from "../api"

const search = {
  namespaced: true,
  state: {
    param: "",
    data: null
  },
  mutations: {
    setParam(state, param) {
      state.param = param;
    },
    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    setParam({ commit }, newParam) {
      commit("setParam", newParam);
    },
    async search({ rootGetters, commit, getters }) {
      ajax("/api/wallet/search", "get", {
        params: {
          wallet_id: rootGetters["wallet/getWalletId"],
          search_str: getters.getParam
        }
      }).then(res => {
        console.log(res.data.data)
        commit("setData", res.data.data)
      })
    }
  },
  getters: {
    getParam(state) {
      return state.param;
    },
    getData(state) {
      return state.data;
    },
  }
}

export default search;