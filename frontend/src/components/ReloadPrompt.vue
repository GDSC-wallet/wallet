<script>
import useRegisterSW from "@/mixins/useRegisterSW";

export default {
  name: "ReloadPrompt",
  mixins: [useRegisterSW],
};
</script>

<template>
  <v-snackbar :value="offlineReady || needRefresh">
    <template  v-if="offlineReady">
      App ready to work offline
    </template>
    <template  v-else>
      New content available, click on reload button to update.
    </template>
    <template v-slot:action="{ attrs }">
      <v-btn v-if="needRefresh" text v-bind="attrs" @click="updateServiceWorker()">
        Update
      </v-btn>
      <v-btn text v-bind="attrs">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
