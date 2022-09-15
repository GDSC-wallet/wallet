<template>
  <v-sheet height="100%" class="d-flex flex-column justify-center">
    <v-sheet class="d-flex justify-center">
      <v-form @submit.prevent="signup(nickname, barcode)" ref="form" lazy-validation v-model="valid">
        <v-card width="100%" max-width="500px">
          <v-card-title>剩下最後一步，填寫你的暱稱吧</v-card-title>
          <v-card-text>
            <v-text-field label="暱稱" placeholder="暱稱" v-model="nickname" required :rules="[(v) => !!v || '請輸入暱稱']" />
            <v-text-field label="雲端發票條碼(選填)" placeholder="雲端發票條碼" v-model="barcode"
              @keyup="barcode = barcode.toUpperCase()" :rules="[rules.required]" />
          </v-card-text>
          <v-card-actions>
            <v-row justify="end">
              <v-col cols="6">
                <v-btn block href="/oauth/google/login">使用其他帳號</v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="primary" type="submit" :disabled="!valid">註冊</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "../../utils";

export default {
  name: "CallbackSignup",
  data() {
    return {
      nickname: "",
      barcode: "",
      valid: true,
      rules: rules
    };
  },
  methods: {
    ...mapActions({
      _signup: "auth/signup",
    }),
    signup(nickname, barcode) {
      if (!this.$refs.form.validate()) return;
      this._signup({ nickname: nickname, barcode: barcode[0] == '/' ? barcode : '/' + barcode }).then(() => {
        this.$router.replace("/login");
      });
    }
  },
  computed: {},
};
</script>