<template>
  <v-dialog v-model="open" max-width="500" scrollable :persistent="fetching">
    <v-card>
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>匯入雲端發票</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-3" v-if="fetching">
        <div v-if="fetchingStage.stage == 1" class="pa-1">
          <p>擷取雲端發票中</p>
          <v-progress-linear indeterminate query></v-progress-linear>
        </div>
        <div v-if="fetchingStage.stage == 2" class="pa-1">
          <p>擷取雲端發票細項中 ({{ (fetchingStage.success + fetchingStage.failure) }}/{{ fetchingStage.total }})</p>
          <v-progress-linear :value="((fetchingStage.success + fetchingStage.failure) / fetchingStage.total) * 100">
          </v-progress-linear>
        </div>
      </v-card-text>
      <v-form @submit.prevent="getEinvoiceData(barcode, password)" ref="form" lazy-validation v-model="valid" v-else>
        <v-card-text class="pa-3">
          <v-text-field label="載具條碼" v-model="barcode" :rules="[(v) => !!v || '請輸入條碼']" @keyup="uppercase" />
          <v-text-field label="載具驗證碼" v-model="password" :type="passwordShow ? 'text' : 'password'"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'" @click:append="passwordShow = !passwordShow"
            :rules="[(v) => !!v || '請輸入驗證碼']" />
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="年" v-model.number="year" type="number" required
                  :rules="[(v) => (v && !isNaN(parseFloat(v))) || '請填入年份']"></v-text-field>
              </v-col>
              <v-col>
                <v-select :items="month" v-model=mon label="月"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-btn block color="primary" type="submit" :disabled="!valid || fetching" :loading="fetching">取得載具發票</v-btn>
        </v-card-actions>
      </v-form>
      <v-card-text v-if="!fetching">
        <v-list two-line>
          <v-list-item v-for="(invoice, index) in invoiceRecords">
            <v-list-item-content>
              <v-list-item-title class="d-flex justify-space-between">
                <span class="overflow-x-auto overflow-y-hidden">{{ invoice.detail }}</span>
                <span>{{ invoice.amount }}</span>
                <v-icon @click="openRecordModal(invoice)">mdi-plus</v-icon>
              </v-list-item-title>
              <v-list-item-subtitle>{{ invoice.date }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ajax from "../../api"

export default {
  name: "EinvoiceModal",
  props: {
    value: Boolean
  },
  data() {
    return {
      valid: true,
      fetching: false,
      fetchingStage: {
        stage: 1,
        total: 0,
        success: 0,
        failure: 0
      },
      fetchingData: {
        success: [],
        failure: []
      },
      barcode: "",
      password: "",
      passwordShow: false,
      datePicker: [false, false],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year: new Date().getFullYear(),
      mon: new Date().getMonth() + 1,
      date: Date()
    }
  },
  mounted() {
    this.barcode = this.getWalletInfo.wallet_barcode
  },
  methods: {
    ...mapActions({
      openModal: "record/openModal",
      importMode: "record/importMode",
      setData: "record/setData",
    }),
    ...mapGetters({
      walletTags: "wallet/getWalletTags",
    }),
    test() {
      this.openModal();
    },
    openRecordModal(invoice) {
      console.log(invoice)
      this.importMode();
      this.openModal();
      this.setData({
        record_amount: invoice.amount,
        record_created_time: "",
        record_date: new Date(invoice.date.slice(0, 4) + '-' + invoice.date.slice(4, 6) + '-' + invoice.date.slice(6, 8))
          .toISOString()
          .split("T")[0],
        record_debtors: [],
        record_description: invoice.seller,
        record_id: "",
        record_name: invoice.detail,
        record_ordinary: 1,
        record_type: "expense",
        record_updated_time: "",
        wallet_record_tag_id: "",/*  this.walletTags('expense').map(val=>val.tag_id)[0], */
      });
    },
    init() {
      this.barcode = this.getWalletInfo.wallet_barcode;
      this.password = "";
      this.passwordShow = false;
      this.fetchingStage = {
        stage: 1,
        total: 0,
        success: 0,
        failure: 0
      }
      this.fetchingData = {
        success: [],
        failure: []
      },
        this.fetching = false;
      this.startDate = "", this.endDate = "";
    },
    getEinvoiceData(barcode, password) {
      let daysInMonth = new Date(this.year, this.mon, 0).getDate();
      if (!this.$refs.form.validate()) return;
      this.fetching = true;
      this.fetchingStage = {
        stage: 1,
        total: 0,
        success: 0,
        failure: 0
      }
      this.fetchingData = {
        success: [],
        failure: []
      },
        ajax("/api/einvoice/headers", "get", {
          params: {
            startDate: String(this.year) + '/0' + String(this.mon) + '/' + "01",
            endDate: String(this.year) + '/0' + String(this.mon) + '/' + String(daysInMonth),
            cardNo: (barcode[0] == '/') ? barcode : '/' + barcode,
            cardEncrypt: password
          }
        }).then(res => {
          if (res.data.data.headers.code !== 200) throw new Error(res.data.data.headers.msg)
          console.log(res.data.data.headers.details)
          return res.data.data.headers.details.map(detail => {
            return {
              cardNo: barcode,
              cardEncrypt: password,
              invNum: detail.invNum,
              year: detail.invDate.year,
              month: detail.invDate.month,
              date: detail.invDate.date
            }
          })
        }).then(async res => {
          const total = res.length
          this.fetchingStage.stage = 2;
          this.fetchingStage.total = total;
          for (let i in res) {
            await ajax("/api/einvoice/details", "get", {
              params: res[i]
            }).then(response => {
              this.fetchingData.success.push(response.data.data);
              this.fetchingStage.success++;
            }).catch(err => {
              this.fetchingData.failure.push(res[i]);
              this.fetchingStage.failure++;
            });
          }
        }).catch(err => {
          if (err.name === "AxiosError") console.log(err.response.data)
          else console.log(err)
        }).then(() => {
          this.fetching = false;
        })
    },
    uppercase() {
      this.barcode = this.barcode.toUpperCase();
    }
  },
  computed: {
    ...mapGetters({
      getWalletInfo: "wallet/getWalletInfo"
    }),
    open: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val)
      }
    },
    invoiceRecords() {
      return this.fetchingData.success.map(invoice => {
        return {
          amount: invoice.amount,
          date: invoice.invDate,
          seller: invoice.sellerName,
          detail: invoice.details.map(detail => detail.description).join(", ")
        }
      })
    }
  },
  watch: {
    open(val) {
      if (this.$refs.form) this.$refs.form.resetValidation();
      if (val) {
        this.init()
      }
    }
  }
}
</script>