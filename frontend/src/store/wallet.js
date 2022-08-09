import ajax from "../api"

const wallet = {
  namespaced: true,
  state: {
    wallet: null
  },
  mutations: {
    setWallet(state, wallet) {
      state.wallet = wallet;
    }
  },
  actions: {
    setWallet({ commit }, wallet) {
      wallet.tags = wallet?.tags.sort((a, b) => a.tag_ordinary - b.tag_ordinary)
      commit("setWallet", wallet);
    },
    async getWallet({ commit, getters, rootGetters }) {
      ajax("/api/wallet", "get", {
        params: {
          wallet_id: getters.getWalletId,
          time_choosen: rootGetters["calendar/getDate"].toISOString().split('Z')[0]
        }
      }).then(res => {
        commit("setWallet", res.data.data)
      }).catch((err) => {
        console.log(err);
      })
    },
    async createWallet({ dispatch, rootGetters }, data) {
      ajax("/api/wallet/create", "post", {
        data: {
          wallet_name: data?.wallet_name,
          wallet_description: data?.wallet_description,
          wallet_barcode: (!data.wallet_barcode) ? rootGetters["auth/basicinformation"] : data.wallet_barcode
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async editWallet({ dispatch }, data) {
      ajax("/api/wallet/edit", "post", {
        data: {
          wallet_name: data?.wallet_name,
          wallet_description: data?.wallet_description,
          wallet_id: data?.wallet_id,
          wallet_barcode: data?.wallet_barcode
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async deleteWallet({ getters, dispatch }) {
      ajax("/api/wallet/delete", "post", {
        data: {
          wallet_id: getters.getWalletId
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async switchWallet({ rootGetters, dispatch }, wallet_id) {
      ajax("/api/wallet", "get", {
        params: {
          wallet_id: wallet_id,
          time_choosen: rootGetters["calendar/getDate"].toISOString().split('Z')[0]
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async createTag({ dispatch, getters }, data) {
      ajax("/api/tag/create", "post", {
        data: {
          tag_wallet_id: getters.getWalletId,
          tag_ordinary: getters.getWalletTags("income").length + getters.getWalletTags("expense").length + 1,
          tag_name: data?.tag_name,
          tag_type: data?.tag_type,
          tag_color: data?.tag_color,
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async editTag({ dispatch }, data) {
      ajax("/api/tag/edit", "post", {
        data: {
          tag_id: data?.tag_id,
          tag_ordinary: data?.tag_ordinary,
          tag_name: data?.tag_name,
          tag_type: data?.tag_type,
          tag_color: data?.tag_color,
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async deleteTag({ dispatch }, tag_id) {
      ajax("/api/tag/delete", "post", {
        data: {
          tag_id: tag_id
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async updateAllTags({ dispatch }, data) {
      ajax("/api/tag/update", "post", {
        data: {
          tags: data
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
  },
  getters: {
    getRecords(state) {
      if (state.wallet) return state.wallet.records;
      return []
    },
    getWalletId(state) {
      if (state.wallet) return state.wallet.wallet_id;
      return ""
    },
    getWalletInfo(state, getters, rootState, rootGetters) {
      if (state.wallet) return {
        wallet_id: state.wallet.wallet_id,
        wallet_total: state.wallet.wallet_total,
        wallet_name: state.wallet.wallet_name,
        wallet_description: state.wallet.wallet_description,
        wallet_barcode: state.wallet.wallet_barcode ? state.wallet.wallet_barcode : rootGetters["auth/getUserBarcode"],
      };
      return {}
    },
    getWalletTags: (state) => (mode) => {
      if (state.wallet && mode == "all") return state.wallet.tags;
      if (state.wallet) return state.wallet.tags.filter(tag => tag.tag_type == mode);
      return []
    },
    getAllWalletTags: (state) => {
      if (state.wallet) return state.wallet.tags;
      return []
    },
  },
}

export default wallet;