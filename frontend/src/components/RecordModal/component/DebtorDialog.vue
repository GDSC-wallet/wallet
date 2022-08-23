<template>
  <v-card>
    <v-form @submit.prevent="submit" ref="form" lazy-validation>
      <v-list-item-group v-model="selected" multiple>
        <v-list-item v-for="(deb, index) in this.getDebtorNames" :key="index"
          active-class="deep-purple--text text--accent-4">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" color="deep-purple accent-4"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-container class="py-0">
                <v-row align="center">
                  <v-col>
                    {{ deb }}
                  </v-col>
                  <v-col>
                    <v-text-field label="金額" v-model="amount[index]" :rules="[rules.number]" class="py-0"
                      @click="stopPop">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-form>
    <NewDebtor />
    <v-btn block @click="submit">確認</v-btn>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewDebtor from "../../DebtorModal/components/NewDebtor.vue";

export default {
  name: "DebtorDialog",
  components: {
    NewDebtor: NewDebtor,
  },
  data() {
    return {
      amount: [],
      selected: [],
      rules: {
        number: val => (!val || !isNaN(parseInt(val))) || '請填入數字',
      },
    };
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      let debInfo = [], debNames = [];
      for (let i = 0; i < this.selected.length; ++i) {
        let cur = this.selected[i];
        if (isNaN(parseInt(this.amount[cur])))
          return;
        debNames[i] = this.getDebtorNames[cur]
        let tmp = {
          debtor_id: this.getDebtor[cur].debtor_id,
          debtor_record_amount: this.amount[cur]
        }
        debInfo.push(tmp);
      }
      this.$emit('finish', debInfo, debNames);
    },
    stopPop(event) {
      event.stopPropagation()
    },
  },
  computed: {
    ...mapGetters({
      getDebtorNames: "debtor/getDebtorNames",
      getDebtor: "debtor/getDebtor"
    })
  }
}
</script>