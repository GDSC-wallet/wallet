<template>
  <div class=" px-4">
    <v-btn block v-if="!showDetail" @click="showDetail = true">
      新增債務人
    </v-btn>
    <div v-if="showDetail">
      <v-col>
        <v-row>
          <v-text-field v-model="debtorName" label="名稱" prepend-icon="mdi-account-arrow-left"
            :rules="[(v) => (v && v.length > 0) || '請填入名稱']">
            <template v-slot:append>
              <v-icon @click="submit">mdi-check</v-icon>
            </template>
          </v-text-field>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewDebtor",
  data() {
    return {
      debtorName: null,
      showDetail: false,
    };
  },
  methods: {
    ...mapActions({
      createDebtor: "debtor/createDebtor"
    }),
    submit() {
      if (!this.debtorName || this.debtorName.length == 0)
        return
      this.createDebtor(this.debtorName);
      this.debtorName = null;
      this.showDetail = false;
    }
  },
  computed: {
    ...mapGetters({
      debtors: "debtor/getDebtorInfo",
    }),
  },
};
</script>