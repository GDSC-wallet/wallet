<template>
  <div>
    <MonthSelector v-model="date" />
    <v-card flat>
      <v-card-text>
        <v-row align="center">
          <v-btn-toggle dense v-model="btnSelected">
            <v-btn :disabled="btnSelected == 0">全部</v-btn>
            <v-btn :disabled="btnSelected == 1">支出</v-btn>
            <v-btn :disabled="btnSelected == 2">收入</v-btn>
          </v-btn-toggle>
        </v-row>
      </v-card-text>
    </v-card>
    <Chart :data="chartData" type="doughnut" chartId="123" />
    <v-col cols="12" sm="6">
      <RecordList :records="getMonthRecords" showDate showFilter />
    </v-col>
  </div>
</template>

<script>
import Chart from "@/components/Chart/Main.vue"
import MonthSelector from "@/components/Calendar/components/MonthSelector.vue"
import RecordList from "../components/RecordCard/RecordList.vue"
import { mapGetters } from "vuex"
export default {
  name: "Statics",
  components: {
    Chart: Chart,
    MonthSelector: MonthSelector,
    RecordList: RecordList
  },
  data() {
    return {
      date: new Date(),
      btnSelected: 0,
    }
  },
  methods: {
    changeDate(v) {
      console.log(v)
    },
  },
  computed: {
    ...mapGetters({
      getRecords: "wallet/getRecords",
      getWalletTags: "wallet/getWalletTags",
      getAllWalletTags: "wallet/getAllWalletTags"
    }),
    getMonthRecords() {
      const vm = this;
      return this.getRecords.filter(record => {
        return record.record_date.slice(0, 7) == vm.getRange;
      }).filter(record => {
        return vm.type == "all" ? true : record.record_type == vm.type;
      })
    },
    type() {
      const arr = ['all', 'expense', 'income'];
      return !this.btnSelected ? arr[0] : arr[this.btnSelected];
    },
    chartData() {
      if (this.type == 'all' && !this.isEmpty) {
        return {
          labels: ["收入", "支出"],
          datasets: [this.getBalance]
        }
      }
      if (this.isEmpty) {
        return {
          labels: ["本月無資料"],
          datasets: [{
            data: [1],
            backgroundColor: ["#5C7FB3"],
          }],
        }
      }
      return {
        labels: this.getLabels,
        datasets: [{
          data: this.getData,
          backgroundColor: this.getColor,
        }]
      }
    },
    getLabels() {
      let vm = this;
      let ret = this.getWalletTags(this.type).map(item => {
        return item.tag_name
      }).filter((val, id, arr) => {
        return vm.getData[arr.indexOf(val)] != 0
      });
      return ret;
    },
    getColor() {
      return this.getWalletTags(this.type).map(item => item.tag_color)
    },
    getData() {
      let arr = [];
      for (let i = 0; i < this.getWalletTags(this.type).length; i++) {
        let sameTag = this.getMonthRecords.filter((rec) => {
          return rec.wallet_record_tag_id == this.getWalletTags(this.type)[i].tag_id;
        });
        arr.push(sameTag.reduce((tmp, object) => {
          return tmp + object.record_amount;
        }, 0));
      }
      return arr
    },
    getRange() {
      return this.date.toISOString().slice(0, 7);
    },
    isEmpty() {
      let sum = 0;
      for (let i = 0; i < this.getData.length; ++i)
        sum += this.getData[i];
      return sum == 0;
    },
    getBalance() {
      const dataFilter = (type) => {
        return this.getMonthRecords.reduce((tmp, object) => {
          return tmp + object.record_amount;
        }, 0)
      }
      let ret = {
        data: [dataFilter("income"), dataFilter("expense")],
        backgroundColor: ['#E6746A', '#5C7FB3'],
      }
      return ret;
    }
  }
}
</script>