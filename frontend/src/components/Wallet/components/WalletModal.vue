<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card style="overflow: hidden" class="d-flex flex-column">
        <v-toolbar dark flat color="primary">
          <v-toolbar-title
            >{{ mode == "edit" ? "修改" : "新增" }}錢包</v-toolbar-title
          >
        </v-toolbar>
        <v-form
          @submit.prevent="handleSubmit"
          ref="form"
          lazy-validation
          v-model="valid"
        >
          <v-container class="flex-grow-1" style="overflow: auto">
            <v-text-field
              label="標題"
              prepend-icon="mdi-format-title"
              v-model="data.wallet_name"
              required
              :rules="[(v) => !!v || '請填入標題']"
            />
            <v-text-field
              label="備註"
              prepend-icon="mdi-message-text"
              v-model="data.wallet_description"
            />
            <v-text-field
              label="載具條碼"
              prepend-icon="mdi-barcode-scan"
              v-model="data.wallet_barcode"
            />
          </v-container>
          <v-card-actions>
            <v-row justify="end">
              <v-col cols="6">
                <v-btn type="submit" color="primary" block :disabled="!valid">
                  {{ mode == "edit" ? "修改" : "新增" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    open: Boolean,
    mode: String,
    editingWallet: Object,
  },
  name: "WalletModal",
  data() {
    return {
      valid: true,
      data: {
        wallet_name: "",
        wallet_description: "",
        wallet_id: "",
        wallet_barcode: ""
      },
    };
  },
  methods: {
    ...mapActions({
      createWallet: "wallet/createWallet",
      editWallet: "wallet/editWallet",
    }),
    handleSubmit() {
      if (!this.$refs.form.validate()) return;
      if (this.mode == "create") {
        this.createWallet(this.data).then(() => {
          this.dialog = false;
        });
      } else if (this.mode == "edit") {
        this.editWallet(this.data).then(() => {
          this.dialog = false;
        });
      }
    },
  },
  computed: {
    dialog: {
      get() {
        return this.open;
      },
      set(value) {
        this.$emit("handleDialogChange", value);
      },
    },
  },
  watch: {
    dialog(newval) {
      if (this.$refs.form) this.$refs.form.resetValidation();
      if (newval == true) {
        if (this.mode == "create") {
          this.data = {
            wallet_name: "",
            wallet_description: "",
            wallet_id: "",
            wallet_barcode: ""
          };
        } else if (this.mode == "edit") {
          this.data = {
            wallet_name: this.editingWallet.wallet_name,
            wallet_description: this.editingWallet.wallet_description,
            wallet_id: this.editingWallet.wallet_id,
            wallet_barcode: this.editingWallet.wallet_barcode
          };
        }
      }
    },
  },
};
</script>