<template>
  <v-dialog v-model="open" max-width="500" scrollable>
    <v-card>
      <bc value="">
        尚未設定載具條碼
      </bc>
      <v-btn @click="closeBacodeModal" block class="my-2" to="/setting"> Setting </v-btn>
    </v-card>
  </v-dialog>

</template>

<script>
import VueBarcode from 'vue-barcode';
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BarcodeModal",
  data() {
    return {
    };
  },
  components: {
    'bc': VueBarcode
  },
  methods: {
    ...mapActions({
      closeModal: "barcode/closeModal",
    }),
    closeBacodeModal() {
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters({
    }),
    open: {
      get() {
        return this.$store.getters["barcode/getModal"];
      },
      set(value) {
        if (value == true) this.$store.dispatch("barcode/openModal");
        if (value == false) this.$store.dispatch("barcode/closeModal");
      },
    },
  }
};
</script>