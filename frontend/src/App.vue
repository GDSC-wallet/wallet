<template>
  <v-app>
    <template v-if="isLoggedin">
      <v-app-bar color="primary" dark app :hide-on-scroll="false">
        <v-app-bar-nav-icon @click="drawer = true" />
        <v-toolbar-title>Wallet</v-toolbar-title>
        <v-spacer />
        <Search />
        <BarcodeModal />
        <template>
          <v-btn icon to="/statics" v-if="$route.name == 'Home'">
            <v-icon>mdi-chart-arc</v-icon>
          </v-btn>
          <v-btn icon to="/" v-else>
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>

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
      <!--
        <v-btn v-if="isLoggedin" color="primary" bottom right fab fixed @click="openRecordModal">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      -->
    </v-main>
    <RecordModal />
    <ReloadPrompt />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Wallets from "./components/Wallet/Main.vue";
import RecordModal from "./components/RecordModal/Main.vue";
import BarcodeModal from "./components/BarcodeModal/Main.vue";
import Search from "./components/Search/Main.vue"
import ReloadPrompt from "./components/ReloadPrompt.vue"

export default {
  name: "Wallet",
  data() {
    return {
      route: "Home",
      drawer: false,
    };
  },
  components: {
    RecordModal: RecordModal,
    Wallets: Wallets,
    BarcodeModal: BarcodeModal,
    Search: Search,
    ReloadPrompt: ReloadPrompt
  },
  mounted() {
    this.login();
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      logout: "auth/logout",
    }),
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
    isReady() {
      if (!this.isLoggedin && this.$route.name != "Login" && this.$route.meta.requiresAuth)
        return this.$router.push({ path: "/login", replace: true });
    },
    isLoggedin() {
      if (!this.isLoggedin && this.$route.name != "Login" && this.$route.meta.requiresAuth)
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