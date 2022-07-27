<template>
  <div>
    <v-btn icon @click="display = true">
      <v-icon>mdi-barcode-scan</v-icon>
    </v-btn>
    <v-dialog v-model="display" max-width="300" scrollable>
      <v-card>
        <bc :value="barcode" align="center">
          尚未設定載具條碼
        </bc>
        <v-btn @click="display = false" block class="my-2" to="/setting"> Setting </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueBarcode from 'vue-barcode';
import { mapGetters } from "vuex";

export default {
  name: "BarcodeModal",
  data() {
    return {
      display: false,
    };
  },
  components: {
    'bc': VueBarcode
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
      getWalletInfo: "wallet/getWalletInfo"
    }),
    barcode() {
      if (!this.getWalletInfo.wallet_barcode)
        return this.basicInformation.barcode;
      return this.getWalletInfo.wallet_barcode;
    }
  }
};
</script>