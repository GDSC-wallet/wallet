<template>
  <div class="px-4 py-4">
    <v-btn block v-if="!showDetail && !edit" @click="showDetail = true">
      新增債務人
    </v-btn>
    <div v-if="showDetail || edit">
      <v-form @submit.prevent="submit" ref="form" lazy-validation>
        <v-text-field v-model="currentName" label="名稱" prepend-icon="mdi-account-arrow-left"
          :rules="[rules.required, rules.counter, rules.duplicate]" dense>
          <template v-slot:append>
            <v-icon @click="submit">mdi-check</v-icon>
          </template>
        </v-text-field>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewDebtor",
  props: {
    dialog: Boolean,
    edit: Boolean,
    previousName: String
  },
  data() {
    return {
      currentName: null,
      showDetail: false,
      rules: {
        required: str => !!str || '不得為空',
        counter: str => !!str && str.length <= 15 || '名稱過長',
        duplicate: str => this.getDebtorNames.findIndex(ele => ele == str) == -1 || '重複名稱'
      },
    };
  },
  mounted() {
    if (this.previousName) this.currentName = this.previousName;
  },
  methods: {
    ...mapActions({
      createDebtor: "debtor/createDebtor",
      editDebtor: "debtor/editDebtor"
    }),
    submit() {
      if (!this.$refs.form.validate()) return;
      if (this.edit) {
        this.editDebtor({ pre: this.previousName, cur: this.currentName });
      } else
        this.createDebtor(this.currentName);
      this.debtorName = null;
      this.showDetail = false;
    }
  },
  computed: {
    ...mapGetters({
      debtors: "debtor/getDebtor",
      getDebtorNames: "debtor/getDebtorNames",
    }),
  },
  watch: {
    dialog: function () {
      this.showDetail = false;
    },
    previousName: function () {
      this.currentName = this.previousName;
    }
  }
};
</script>