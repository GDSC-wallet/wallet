<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay scrollable transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary" class="flex-grow-0" v-touch="{ down: () => dialog = false }">
        <v-toolbar-title>搜尋</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="py-5">
        <form @submit.prevent="search" class="d-flex align-center">
          <v-text-field solo hide-details clearable label="搜尋..." class="flex-grow-1" v-model="searchParam" />
          <v-btn icon large class="ml-2" type="submit">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </form>
        <div v-if="getData" class="py-3">
          <RecordCard :records="getData" v-if="getData?.length > 0" />
          <p v-else>無資料</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import RecordCard from "../RecordCard/Main.vue"
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
    }
  },
  components: {
    RecordCard: RecordCard
  },
  methods: {
    ...mapActions({
      search: "search/search",
      setParam: "search/setParam"
    })
  },
  computed: {
    ...mapGetters({
      getData: "search/getData",
    }),
    searchParam: {
      get() {
        return this.$store.getters["search/getParam"];
      },
      set(value) {
        this.setParam(value);
      }
    }
  }
}
</script>