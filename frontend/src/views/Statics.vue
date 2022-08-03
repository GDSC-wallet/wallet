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
      <RecordCard :records="handleRecord(getRecords)" showDate />
    </v-col>
  </div>
</template>

<script>
import Chart from "@/components/Chart/Main.vue"
import MonthSelector from "@/components/Calendar/components/MonthSelector.vue"
import RecordCard from "../components/RecordCard/Main.vue"
import { mapGetters } from "vuex"
export default {
  name: "Statics",
  components: {
    Chart: Chart,
    MonthSelector: MonthSelector,
    RecordCard: RecordCard
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
    handleRecord(arr) {
      let th = this;
      let tmp = arr.filter(rec => rec.record_date.slice(0, 7) == th.getRange);
      if (th.type != 'all')
        tmp = arr.filter(rec => rec.record_type == th.type);
      tmp.sort(function (a, b) {
        if (a.record_date > b.record_date) return 1;
        return -1;
      });
      return tmp;
    }
  },
  computed: {
    ...mapGetters({
      getRecords: "wallet/getRecords",
      getAllWalletTags: "wallet/getAllWalletTags"
    }),
    type() {
      let arr = ['all', 'expense', 'income'];
      if (!this.btnSelected)
        return arr[0]
      return arr[this.btnSelected];
    },
    chartData() {
      let th = this;
      if (this.isEmpty) {
        let nullData = {
          labels: ["本月無資料"],
          datasets: [{
            data: [1],
            backgroundColor: ["#5C7FB3"],
            hoverOffset: 4,
          }],
        }
        return nullData;
      }
      if (this.type == 'all') {
        return {
          labels: ["收入", "支出"],
          datasets: [this.getBalance]
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
      let th = this;
      let ret = this.getAllWalletTags.filter(tag => {
        return tag.tag_type == th.type
      }).map(item => {
        return item.tag_name
      }).filter((val, id, arr) => {
        return th.getData[arr.indexOf(val)] != 0
      });
      return ret;
    },
    getColor() {
      let th = this;
      let ret = this.getAllWalletTags.filter(tag => tag.tag_type == th.type)
      return ret.map(item => item.tag_color)
    },
    getData() {
      let th = this
      let validRecord = this.getRecords.filter(function (rec) {
        return (rec.record_date.slice(0, 7) == th.getRange && rec.record_type == th.type)
      })
      let arr = [];
      let validTags = th.getAllWalletTags.filter((tag) => { return tag.tag_type == th.type });
      for (let i = 0; i < validTags.length; i++) {
        let sameTag = validRecord.filter(function (rec) {
          return rec.wallet_record_tag_id == validTags[i].tag_id;
        });
        arr.push(sameTag.reduce((tmp, object) => {
          return tmp + object.record_amount;
        }, 0));
      }
      return arr
    },
    getRange() {
      let mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let str = String();
      let dateStr = String(this.date);
      str = str.concat(dateStr.slice(11, 15), "-",);
      var tmp = mon.findIndex(i => i == dateStr.slice(4, 7)) + 1;
      if (tmp < 10)
        str = str.concat("0");
      str = str.concat(tmp);
      return str;
    },
    isEmpty() {
      let sum = 0;
      let vm = this;
      for (let i = 0; i < vm.getData.length; ++i)
        sum += vm.getData[i]
      if (sum == 0)
        return true;
      return false;
    },
    getBalance() {
      const dataFilter = (type) => {
        let th = this;
        return this.getRecords.filter(function (rec) {
          return (rec.record_date.slice(0, 7) == th.getRange && rec.record_type == type)
        }).reduce((tmp, object) => {
          return tmp + object.record_amount;
        }, 0)
      }
      let ret = {
        data: [dataFilter("income"), dataFilter("expense")],
        backgroundColor: ['#E6746A', '#5C7FB3'],
        hoverOffset: 4,
      }
      return ret;
    }
  }
}
</script>