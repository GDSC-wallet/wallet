<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on"> Edit </v-btn>
    </template>
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>編輯債務人</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-list>
          <v-list-item v-for="(debtor, index) in debtors" :key="index">
            <v-list-item-content>
              <v-sheet class="d-flex justify-space-between">
                <span class="flex-grow-1">
                  {{ debtor.debtor_name }}
                </span>
                <div>
                  <NewDebtor edit :previousName="previousName">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon @click="edit(debtor.debtor_name)">
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                  </NewDebtor>
                  <v-btn
                    icon
                    color="error"
                    @click="deleteDebtor(debtor.debtor_id)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </v-sheet>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <NewDebtor>
          <template v-slot:activator="{ on, attrs }">
            <v-btn block color="primary" v-bind="attrs" v-on="on">
              新增債務人
            </v-btn>
          </template>
        </NewDebtor>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewDebtor from "./components/NewDebtor.vue";

export default {
  name: "DebtorModal",
  components: {
    NewDebtor: NewDebtor,
  },
  data() {
    return {
      dialogOpen: false,
      previousName: null,
    };
  },
  methods: {
    ...mapActions({
      createDebtor: "debtor/createDebtor",
      deleteDebtor: "debtor/deleteDebtor",
      editDebtor: "debtor/editDebtor",
      getDebtorId: "debtor/getDebtorId",
    }),
    ...mapGetters({}),
    edit(str) {
      this.editDialog = true;
      this.previousName = str;
    },
  },
  computed: {
    ...mapGetters({
      debtors: "debtor/getDebtor",
    }),
  },
};
</script>
