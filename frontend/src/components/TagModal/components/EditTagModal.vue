<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>
          {{ mode == "create" ? "新增" : mode == "edit" ? "編輯" : ""}}{{ type == "income" ? "收入" : type == "expense" ? "支出" : ""}}標籤
        </v-toolbar-title>
      </v-toolbar>
      <v-form
        @submit.prevent="sendTag"
        ref="form"
        lazy-validation
        v-model="valid"
      >
        <v-container class="flex-grow-1" style="overflow: auto">
          <v-text-field
            label="標題"
            v-model="data.tag_name"
            prepend-icon="mdi-format-title"
            required
            :rules="[(v) => (v && v.length > 0) || '請填入標題']"
          ></v-text-field>
          <v-color-picker v-model="data.tag_color" mode="hexa"></v-color-picker>
        </v-container>
        <v-card-actions>
          <v-row justify="end">
            <v-col cols="6">
              <v-btn color="primary" block type="submit" :disabled="!valid"
                >儲存</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EditTagModal",
  props: {
    open: Boolean,
    mode: String,
    type: String,
    editData: Object
  },
  data() {
    return {
      data: {
        tag_name: "",
        tag_color: "#B9B9B9",
      },
      valid: true
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      createTag: "wallet/createTag",
      editTag: "wallet/editTag",
    }),
    sendTag() {
      if (!this.$refs.form.validate()) return;
      if (this.mode == "create") {
        this.createTag({...this.data, tag_type: this.type}).then(() => {
          this.dialogOpen = false
        });
      }else if(this.mode == "edit") {
        this.editTag({...this.data, tag_type: this.type}).then(() => {
          this.dialogOpen = false
        });
      }
    },
  },
  computed: {
    ...mapGetters({
      tags: "wallet/getWalletTags",
    }),
    dialogOpen: {
      get() {
        return this.open;
      },
      set(value) {
        this.$emit("handleChange", value);
      },
    },
  },
  watch: {
    open(newVal) {
      if (newVal == true) {
        if (this.$refs.form) this.$refs.form.resetValidation();
        if (this.mode == "create") {
          this.data = {
            tag_name: "",
            tag_color: "#B9B9B9",
          };
        }else if(this.mode == "edit") {
          this.data = {
            tag_name: this.editData?.tag_name,
            tag_color: this.editData?.tag_color,
            tag_id: this.editData?.tag_id,
            tag_ordinary: this.editData?.tag_ordinary
          }
        }
      }
    },
  },
};
</script>