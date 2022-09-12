<template>
  <v-dialog v-model="open" scrollable max-width="500px">
    <v-card>
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>債務人</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-2">
        <v-form @submit.prevent="submit" ref="form" lazy-validation>
          <v-list-item-group v-model="selected" multiple>
            <v-list-item
              v-for="(deb, index) in this.getDebtorNames"
              :key="index"
              active-class="deep-purple--text text--accent-4"
              :ripple="false"
            >
              <template v-slot:default="{ active }">
                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="deep-purple accent-4"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-content>
                  <v-container class="py-0">
                    <v-row align="center">
                      <v-col>
                        {{ deb }}
                      </v-col>
                      <v-col>
                        <v-text-field
                          label="金額"
                          v-model="amount[index]"
                          :rules="[rules.number]"
                          class="py-0"
                          @click="stopPop"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-0">
        <v-container>
          <v-row>
            <v-col>
              <NewDebtor>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="success"
                    block
                    dark
                    class="mb-3"
                    v-bind="attrs"
                    v-on="on"
                  >
                    新增債務人
                  </v-btn>
                </template>
              </NewDebtor>
            </v-col>
            <v-col>
              <v-btn block @click="submit" color="primary">確認</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewDebtor from "../../DebtorModal/components/NewDebtor.vue";

export default {
  name: "DebtorDialog",
  components: {
    NewDebtor: NewDebtor,
  },
  props: {
    value: Boolean,
  },
  data() {
    return {
      amount: [],
      selected: [],
      rules: {
        number: (val) => !val || !isNaN(parseInt(val)) || "請填入數字",
      },
    };
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return;
      let debInfo = [],
        debNames = [];
      for (let i = 0; i < this.selected.length; ++i) {
        let cur = this.selected[i];
        if (isNaN(parseInt(this.amount[cur]))) return;
        debNames[i] = this.getDebtorNames[cur];
        let tmp = {
          debtor_id: this.getDebtor[cur].debtor_id,
          debtor_record_amount: this.amount[cur],
        };
        debInfo.push(tmp);
      }
      this.$emit("finish", debInfo, debNames);
    },
    stopPop(event) {
      event.stopPropagation();
    },
  },
  computed: {
    ...mapGetters({
      getDebtorNames: "debtor/getDebtorNames",
      getDebtor: "debtor/getDebtor",
      getModal: "record/getModal",
      getData: "record/getData",
      mode: "record/getMode",
    }),
    open: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    getModal(newVal) {
      if (newVal == true) {
        if (this.$refs.form) this.$refs.form.resetValidation();
        this.selected = [];
        this.amount = [];
        if (this.mode == "edit") {
          let tmp = this.getData.record_debtors.map((ele) => ele.debtor_name);
          for (let i = 0; i < tmp.length; ++i) {
            let id = this.getDebtorNames.findIndex((str) => str == tmp[i]);
            this.selected[i] = id;
            this.amount[id] =
              this.getData.record_debtors[i].debtor_record_amount;
          }
        }
      }
    },
  },
};
</script>
