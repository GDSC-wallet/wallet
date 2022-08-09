<template>
  <v-sheet>
    <v-toolbar flat class="mb-3">
      <v-toolbar-title>設定</v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col cols="12">
        <div class="mx-1 my-3 d-flex justify-space-between align-center">
          <span>個人資料</span>
          <EditProfileModal />
        </div>
        <v-card class="mx-1">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1">
                {{ basicInformation.nickname }}
              </v-list-item-title>
              <v-list-item-subtitle class="d-flex align-center">
                {{ basicInformation.username }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ basicInformation.barcode }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="12">
        <p>錢包設定</p>
        <v-card class="mx-1">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1 d-flex justify-space-between">
                <span>{{ getWalletInfo.wallet_name }}</span>
                <span>${{ getWalletInfo.wallet_total }}</span>
              </v-list-item-title>
              <v-list-item-subtitle class="d-flex align-center">
                {{ getWalletInfo.wallet_description }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ getWalletInfo.wallet_barcode }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-container>
            <v-row dense>
              <v-col cols="4">
                <v-btn block @click="handleDialogChange(true)">編輯標籤</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="info" block @click="editModal(getWalletInfo)">編輯錢包</v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn color="error" block @click="deleteWallet(getWalletInfo.wallet_id)">刪除錢包</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <WalletModal mode="edit" :open="walletDialogOpen" :editingWallet="edittingWallet"
      @handleDialogChange="handleWalletDialogChange" />
    <TagModal :open="tagDialogOpen" @handleChange="handleDialogChange" />
  </v-sheet>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import WalletModal from "../components/Wallet/components/WalletModal.vue";
import TagModal from "../components/TagModal/Main.vue";
import EditProfileModal from "../components/Setting/EditProfileModal.vue";

export default {
  name: "Setting",
  data() {
    return {
      tagDialogOpen: false,
      walletDialogOpen: false,
      edittingWallet: null,
      display: true
    };
  },
  components: {
    WalletModal: WalletModal,
    TagModal: TagModal,
    EditProfileModal: EditProfileModal
  },
  mounted() { },
  methods: {
    ...mapActions({
      deleteWallet: "wallet/deleteWallet",
      editProfile: "auth/editProfile"
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
    submitBarcode() {
      this.display = !this.display;
      //update to database NOT yet done
    }
  },
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
      getWalletInfo: "wallet/getWalletInfo",
    }),
  },
};
</script>