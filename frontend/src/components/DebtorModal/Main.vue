<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        Edit
      </v-btn>
    </template>
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>編輯債務人</v-toolbar-title>
      </v-toolbar>
      <v-container class="flex-grow-1" style="overflow: auto">
        <v-list-item v-for="debtor in debtors">
          <v-list-item-content>
            <v-card>
              <span>
                {{ debtor.debtor_name }}
                <v-btn icon>
                  <v-icon @click="">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="error" @click="deleteDebtor(debtor.debtor_name)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </span>
            </v-card>
          </v-list-item-content>
        </v-list-item>
      </v-container>
        <NewDebtor />
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
    };
  },
  methods: {
    ...mapActions({
      createDebtor: "debtor/createDebtor",
      deleteDebtor: "debtor/deleteDebtor"
    }),
  },
  computed: {
    ...mapGetters({
      debtors: "debtor/getDebtor",
    }),
  },
};
</script>