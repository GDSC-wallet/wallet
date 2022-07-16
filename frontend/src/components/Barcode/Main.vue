<template>
  <v-dialog v-model="open" max-width="500" scrollable>
    <v-card>
      <bc value="/NTU8N9X">
        Show this if the rendering fails.
      </bc>
    </v-card>
  </v-dialog>

</template>

<script>
import VueBarcode from 'vue-barcode';
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Barcode",
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