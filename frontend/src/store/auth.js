import ajax from "../api"

const auth = {
  namespaced: true,
  state: {
    profile: null,
    isAuthenticated: false,
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    authenticateSuccess(state) {
      state.isAuthenticated = true;
    },
    authenticateFail(state) {
      state.isAuthenticated = false;
    },
    logout(state) {
      state.profile = {};
      state.isAuthenticated = false;
    }
  },
  actions: {
    login({ commit, dispatch }) {
      commit("logout");
      commit("setProfile", null);
      dispatch("getProfile")
    },
    async getProfile({ commit, rootGetters, dispatch }) {
      const date = rootGetters["calendar/getDate"];
      ajax("/api/user/profile", "get", {
        params: {
          time_choosen: new Date(date).toISOString().split("Z")[0]
        }
      }).then(res => {
        if (!res.data?.success) throw new Error(res.data);
        commit("setProfile", res.data.data);
        dispatch("wallet/setWallet", res.data.data.wallets.find(wallet => wallet.wallet_id == res.data.data.selected_wallet_id), { root: true })
        commit("authenticateSuccess")
      }).catch((err) => {
        console.log(err);
        commit("logout");
      })
    },
    async editProfile({ dispatch }, { nickname, barcode }) {
      ajax("/api/user/edit", "post", { 
        data: { 
          nickname: nickname,
          barcode: barcode,
          elec_invoice_agree: true
        }
      }).then(res => {
        if (!res.data?.success) throw new Error(res.data);
        dispatch("getProfile")
      }).catch((err) => {
        console.log(err);
        throw err;
      });
    },
    async signup({ commit, dispatch }, { nickname, barcode }) {
      ajax("/api/user/signup", "post", { data: { nickname: nickname, barcode: barcode } }).then(res => {
        if (!res.data?.success) throw new Error(res.data);
        dispatch("login")
      }).catch((err) => {
        console.log(err);
        commit("logout");
      });
    },
    async logout({ commit }) {
      ajax("/oauth/logout", "get").then(() => {
        commit("logout");
      })
    }
  },
  getters: {
    isLoggedin(state) {
      return state.isAuthenticated;
    },
    isReady(state) {
      return state.profile != null;
    },
    basicInformation(state) {
      return {
        nickname: state.profile?.nickname,
        username: state.profile?.username,
        barcode: state.profile?.barcode
      }
    },
    getUserId(state) {
      if (state.profile) return state.profile.user_id;
      return "";
    },
    getWallets(state) {
      if (state.profile) return state.profile.wallets.sort((a, b) => b.selected - a.selected).map(wallet => {
        return {
          wallet_id: wallet.wallet_id,
          wallet_total: wallet.wallet_total,
          wallet_name: wallet.wallet_name,
          wallet_description: wallet.wallet_description,
          selected: wallet.selected ? true : false
        }
      });
      return [];
    },
    getUserBarcode(state) {
      return state.profile?.barcode
    }
  }
}

export default auth;