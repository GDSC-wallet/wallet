<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on"> Edit </v-btn>
    </template>
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>編輯債務人</v-toolbar-title>
      </v-toolbar>
      <v-container class="flex-grow-1" style="overflow: auto">
        <v-list>
          <v-list-item v-for="(debtor, index) in debtors" :key="index">
            <v-list-item-content>
              <v-sheet class="d-flex justify-space-between">
                <span class="flex-grow-1">
                  {{ debtor.debtor_name }}
                </span>
                <div>
                  <v-btn icon>
                    <v-icon @click="edit(debtor.debtor_name)"
                      >mdi-pencil</v-icon
                    >
                  </v-btn>
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
      </v-container>
      <NewDebtor :dialog="dialogOpen" />
    </v-card>
    <v-dialog v-model="editDialog">
      <v-card>
        <NewDebtor
          edit
          :dialog="dialogOpen"
          :previousName="previousName"
          @finish="editDialog = false"
        />
      </v-card>
    </v-dialog>
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
      editDialog: false,
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
