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
        <v-container>
          <v-btn @click="display = false" block to="/setting"> Setting </v-btn>
        </v-container>
        
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueBarcode from 'vue-barcode';
import { mapGetters } from "vuex";

export default {
  name: "BarcodeModal",
  components: {
    'bc': VueBarcode
  },
  data() {
    return {
      display: false,
    };
  },
  computed: {
    ...mapGetters({
      getWalletInfo: "wallet/getWalletInfo"
    }),
    barcode() {
      return this.getWalletInfo.wallet_barcode;
    }
  }
};
</script>