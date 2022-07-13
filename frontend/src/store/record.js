import ajax from "../api"

const record = {
  namespaced: true,
  state: {
    modal: false,
    data: {},
    mode: "create"
  },
  mutations: {
    setModal(state, status) {
      state.modal = status;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setData(state, data) {
      state.data = data
    }
  },
  actions: {
    openModal({ commit }) {
      commit("setModal", true);
    },
    closeModal({ commit }) {
      commit("setModal", false);
    },
    createMode({ commit }) {
      commit("setMode", "create");
    },
    editMode({ commit }) {
      commit("setMode", "edit");
    },
    setData({ commit }, data) {
      commit("setData", data)
    },
    async createRecord({ rootGetters, dispatch }, record) {
      ajax("/api/record/create", "post", {
        data: {
          wallet_id: rootGetters["wallet/getWalletId"],
          wallet_record_tag_id: record?.wallet_record_tag_id,
          record_ordinary: 1,
          record_name: record?.record_name,
          record_description: record?.record_description,
          record_amount: (record?.record_type == "expense" ? -1 : 1) * record?.record_amount,
          record_type: record?.record_type,
          record_date: new Date(record?.record_date).toISOString().split("Z")[0],
        }
      }).then(res => {
        console.log(res.data);
        dispatch("auth/getProfile", null, { root: true });
      }).catch((err) => {
        console.log(err);
      }).then(() => {
        dispatch("closeModal");
      })
    },
    async editRecord({ rootGetters, getters, dispatch }, record) {
      const old_record = getters.getData;
      const new_record_amount = record?.record_amount;
      const old_record_amount = old_record?.record_amount;
      const new_record_weight = record?.record_type == "expense" ? -1 : 1;
      const old_record_weight = old_record?.record_type == "expense" ? -1 : 1;
      const diff = new_record_weight * new_record_amount - old_record_weight * old_record_amount;

      ajax("/api/record/edit", "post", {
        data: {
          record_id: record?.record_id,
          record_wallet_id: rootGetters["wallet/getWalletId"],
          wallet_record_tag_id: record?.wallet_record_tag_id,
          record_ordinary: 1,
          record_name: record?.record_name,
          record_description: record?.record_description,
          record_amount: record?.record_amount,
          record_type: record?.record_type,
          record_date: new Date(record?.record_date).toISOString().split("Z")[0],
          record_amount_diff: diff
        }
      }).then(res => {
        console.log(res.data);
        dispatch("auth/getProfile", null, { root: true });
      }).catch((err) => {
        console.log(err);
      }).then(() => {
        dispatch("closeModal");
      })
    },
    async deleteRecord({ rootGetters, dispatch }, record) {
      ajax("/api/record/delete", "post", {
        data: {
          record_id: record?.record_id,
          record_wallet_id: rootGetters["wallet/getWalletId"],
          record_amount: record?.record_amount,
        }
      }).then(res => {
        console.log(res.data);
        dispatch("auth/getProfile", null, { root: true });
      }).catch((err) => {
        console.log(err);
      }).then(() => {
        dispatch("closeModal");
      })
    }
  },
  getters: {
    getModal(state) {
      return state.modal;
    },
    getMode(state) {
      return state.mode;
    },
    getData(state) {
      return state.data
    }
  }
}

export default record;