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
        res.data.data.sort((a, b) => {
          if(a.record_date == b.record_date) {
            if(a.record_updated_time == b.record_updated_time) {
              return b.record_created_time > a.record_created_time ? 1 : -1;
            }
            return b.record_updated_time > a.record_updated_time ? 1 : -1;
          }
          return b.record_date > a.record_date ? 1 : -1;
        })
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