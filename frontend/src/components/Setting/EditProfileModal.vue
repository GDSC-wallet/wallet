<template>
  <v-dialog v-model="open" max-width="500" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        Edit
      </v-btn>
    </template>
    <v-card>
      <v-form @submit.prevent="editProfile(nickname, barcode)" ref="form" lazy-validation v-model="valid">
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>編輯個人資料</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-text-field prepend-icon="mdi-account" label="暱稱" placeholder="暱稱" v-model="nickname" required :rules="[(v) => !!v || '請輸入暱稱']" />
          <v-text-field prepend-icon="mdi-barcode" label="雲端發票條碼(選填)" placeholder="雲端發票條碼" v-model="barcode" />
        </v-card-text>
        <v-card-actions class="py-0 px-3">
          <v-container class="px-0">
            <v-row justify="end">
              <v-col cols="6">
                <v-btn type="submit" color="primary" block>Submit</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "EditProfileModal",
  data() {
    return {
      open: false,
      nickname: "",
      barcode: "",
      valid: true
    }
  },
  mounted() {
    this.nickname = this.basicInformation.nickname;
    this.barcode = this.basicInformation.barcode;
  },
  methods: {
    ...mapActions({
      _editProfile: "auth/editProfile"
    }),
    editProfile(nickname, barcode) {
      if (!this.$refs.form.validate()) return;
      this._editProfile({ nickname: nickname, barcode: barcode }).then(() => {
        this.open = false
      })
    }
  },
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
    })
  }
}
</script>