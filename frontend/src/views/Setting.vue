<template>
  <v-sheet>
    <v-toolbar flat class="mb-3">
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>設定</v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="12">
        <p>使用者設定</p>
        <v-card class="mx-1">
          <v-card-title>{{ basicInformation.nickname }}</v-card-title>
          <v-card-subtitle>{{ basicInformation.username }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12">
        <p>錢包設定</p>
        <v-card class="mx-1">
          <v-card-title class="text-h6 d-flex justify-space-between">
            <span>{{ getWalletInfo.wallet_name }}</span>
            <span>${{ getWalletInfo.wallet_total }}</span>
          </v-card-title>
          <v-card-subtitle>{{
            getWalletInfo.wallet_description
          }}</v-card-subtitle>
          <v-container>
            <v-row dense>
              <v-col cols="4">
                <v-btn block @click="handleDialogChange(true)">編輯標籤</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="info" block @click="editModal(getWalletInfo)"
                  >編輯錢包</v-btn
                >
              </v-col>
              <v-col cols="4">
                <v-btn
                  color="error"
                  block
                  @click="deleteWallet(getWalletInfo.wallet_id)"
                  >刪除錢包</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <WalletModal
      mode="edit"
      :open="walletDialogOpen"
      :editingWallet="edittingWallet"
      @handleDialogChange="handleWalletDialogChange"
    />
    <TagModal :open="tagDialogOpen" @handleChange="handleDialogChange" />
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import WalletModal from "../components/Wallet/components/WalletModal.vue";
import TagModal from "../components/TagModal/Main.vue";

export default {
  name: "Setting",
  data() {
    return {
      tagDialogOpen: false,
      walletDialogOpen: false,
      edittingWallet: null,
    };
  },
  components: {
    WalletModal: WalletModal,
    TagModal: TagModal,
  },
  mounted() {},
  methods: {
    ...mapActions({
      deleteWallet: "wallet/deleteWallet",
    }),
    handleDialogChange(value) {
      this.tagDialogOpen = value;
    },
    handleWalletDialogChange(value) {
      this.walletDialogOpen = value;
    },
    editModal(data) {
      (this.edittingWallet = data), (this.walletDialogOpen = true);
    },
  },
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
      getWalletInfo: "wallet/getWalletInfo",
    }),
  },
};
</script>