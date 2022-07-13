<template>
  <v-sheet height="100%" class="d-flex flex-column justify-center">
    <v-sheet class="d-flex justify-center">
      <v-card width="100%" max-width="500px">
        <v-card-title>剩下最後一步，填寫你的暱稱吧</v-card-title>
        <v-card-text>
          <v-text-field label="暱稱" placeholder="暱稱" v-model="nickname" />
        </v-card-text>
        <v-card-actions>
          <v-row justify="end">
            <v-col cols="6">
              <v-btn block color="primary" @click="signup(nickname)">註冊</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CallbackSignup",
  data() {
    return {
      nickname: "",
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      _signup: "auth/signup",
    }),
    signup(nickname) {
      this._signup({ nickname: nickname }).then(() => {
        this.$router.replace("/login");
      });
    }
  },
  computed: {},
};
</script>