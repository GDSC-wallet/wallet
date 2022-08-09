<template>
  <p>pending...</p>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CallbackLogin",
  data() {
    return {};
  },
  mounted() {
    this.login().then(() => {
      this.$router.replace("/login");
    });
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
  },
  computed: {},
};
</script>