<template>
  <v-app>
    <template v-if="isLoggedin">
      <v-app-bar color="deep-purple accent-4" dark app :hide-on-scroll="false">
        <v-app-bar-nav-icon @click="drawer = true" />
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-barcode-scan</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-chart-arc</v-icon>
        </v-btn>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" app temporary>
        <template v-slot:prepend>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ basicInformation.nickname }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ basicInformation.username }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </template>
        <Wallets />
        <template v-slot:append>
          <div class="pa-4">
            <v-btn block class="my-2" to="/setting"> Setting </v-btn>
            <v-btn block color="error" class="my-2" @click="logout"> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </template>
    <v-main v-if="isReady">
      <v-container style="height: 100%" fluid>
        <router-view />
      </v-container>
      <RecordModal />
      <v-btn
        v-if="isLoggedin"
        color="primary"
        bottom
        right
        fab
        fixed
        @click="openRecordModal"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Wallets from "./components/Wallet/Main.vue";
import RecordModal from "./components/RecordModal/Main.vue";

export default {
  name: "App",
  data() {
    return {
      route: "Home",
      drawer: false,
    };
  },
  components: {
    RecordModal: RecordModal,
    Wallets: Wallets,
  },
  mounted() {
    this.login();
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      logout: "auth/logout",
      openModal: "record/openModal",
      switchCreateMode: "record/createMode",
    }),
    openRecordModal() {
      this.openModal();
      this.switchCreateMode();
    },
  },
  computed: {
    ...mapGetters({
      isLoggedin: "auth/isLoggedin",
      isReady: "auth/isReady",
      basicInformation: "auth/basicInformation",
      walletDetail: "wallet/getWalletDetail",
    }),
  },
  watch: {
    isLoggedin() {
      if (!this.isLoggedin)
        return this.$router.push({ path: "/login", replace: true });
    },
  },
};
</script>

<style>
.v-bottom-navigation--fixed {
  position: fixed !important;
}

.v-item-group.v-bottom-navigation .v-btn {
  height: inherit !important;
}

.v-btn::before {
  background-color: transparent !important;
}

.v-tab::before {
  background-color: transparent !important;
}
</style>