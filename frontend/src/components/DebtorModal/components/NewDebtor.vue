<template>
  <!-- <div class="px-4 py-4">
    <v-btn block v-if="!showDetail && !edit" @click="showDetail = true">
      新增債務人
    </v-btn>
    <div v-if="showDetail || edit">
      <v-form @submit.prevent="submit" ref="form" lazy-validation>
        <v-text-field
          v-model="currentName"
          label="名稱"
          prepend-icon="mdi-account-arrow-left"
          :rules="[rules.required, rules.counter, rules.duplicate]"
          dense
          autofocus
        >
          <template v-slot:append>
            <v-icon @click="submit">mdi-check</v-icon>
          </template>
        </v-text-field>
      </v-form>
    </div>
  </div> -->
  <v-dialog v-model="open">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs">
        <v-btn block v-bind="attrs" v-on="on"> Click Me </v-btn>
      </slot>
    </template>
    <v-form v-model="valid" @submit.prevent="submit" ref="form" lazy-validation>
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>{{ edit ? "編輯" : "新增"}}債務人</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="currentName"
            label="名稱"
            prepend-icon="mdi-account-arrow-left"
            :rules="[rules.required, rules.counter, rules.duplicate]"
            dense
            autofocus
          />
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="primary" type="submit" :disabled="!valid">{{ edit ? "儲存" : "新增"}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewDebtor",
  props: {
    dialog: Boolean,
    edit: Boolean,
    previousName: String,
  },
  data() {
    return {
      currentName: null,
      rules: {
        required: (str) => !!str || "不得為空",
        counter: (str) => (!!str && str.length <= 15) || "名稱過長",
        duplicate: (str) =>
          this.getDebtorNames.findIndex((ele) => ele == str) == -1 ||
          "重複名稱",
      },
      open: false,
      valid: true,
    };
  },
  mounted() {
    if (this.previousName) this.currentName = this.previousName;
  },
  methods: {
    ...mapActions({
      createDebtor: "debtor/createDebtor",
      editDebtor: "debtor/editDebtor",
    }),
    submit() {
      if (!this.$refs.form.validate()) return;
      if (this.edit) {
        this.editDebtor({ pre: this.previousName, cur: this.currentName });
      } else this.createDebtor(this.currentName);
      this.currentName = null;
      this.open = false
      this.$emit("finish");
    },
  },
  computed: {
    ...mapGetters({
      debtors: "debtor/getDebtor",
      getDebtorNames: "debtor/getDebtorNames",
    }),
  },
  watch: {
    previousName: function () {
      this.currentName = this.previousName;
    },
    open(val) {
      if(val === true) {
        if (this.$refs.form) this.$refs.form.resetValidation();
      }
    }
  },
};
</script>
