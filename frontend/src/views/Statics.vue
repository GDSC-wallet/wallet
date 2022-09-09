<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <MonthSelector v-model="date" />
        <div class="d-flex flex-row-reverse justify-space-between py-2">
          <v-btn v-if="!donut" @click="donut = true" dense>
            <v-icon>mdi-chart-donut</v-icon>
          </v-btn>
          <v-btn v-else @click="donut = false" dense>
            <v-icon>mdi-chart-bar</v-icon>
          </v-btn>
          <v-btn-toggle v-if="donut" dense v-model="btnSelected">
            <v-btn :disabled="btnSelected == 0">全部</v-btn>
            <v-btn :disabled="btnSelected == 1">支出</v-btn>
            <v-btn :disabled="btnSelected == 2">收入</v-btn>
          </v-btn-toggle>
        </div>
        <div class="pt-2">
          <DonutChart v-if="donut" :data="chartData" chartId="111" />
          <BarChart v-else :data="chartData" chartId="222" :max="getMax" />
        </div>
      </v-col>
      <v-col cols="12" sm="6">
        <RecordList :records="getMonthRecords" showDate showFilter>
          <template v-slot:empty>
            <div class="mt-5 text-center">
              本月無資料
            </div>
          </template>
        </RecordList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MonthSelector from "@/components/Calendar/components/MonthSelector.vue";
import RecordList from "../components/RecordCard/RecordList.vue";
import { mapGetters } from "vuex";
import BarChart from "../components/Chart/components/BarChart.vue";
import DonutChart from "../components/Chart/components/DonutChart.vue";
export default {
  name: "Statics",
  components: {
    MonthSelector: MonthSelector,
    RecordList: RecordList,
    BarChart,
    DonutChart,
  },
  data() {
    return {
      date: new Date(),
      btnSelected: 0,
      donut: true,
    };
  },
  methods: {
    changeDate(v) {
      console.log(v);
    },
    strToDate(str) {
      let tmp = new Date(str);
      return tmp.getDate();
    },
  },
  computed: {
    ...mapGetters({
      getRecords: "wallet/getRecords",
      getWalletTags: "wallet/getWalletTags",
      getAllWalletTags: "wallet/getAllWalletTags",
    }),
    getMonthRecords() {
      const vm = this;
      return this.getRecords
        .filter((record) => {
          return record.record_date.slice(0, 7) == vm.getRange;
        })
        .filter((record) => {
          return vm.type == "all" ? true : record.record_type == vm.type;
        });
    },
    type() {
      const arr = ["all", "expense", "income"];
      return !this.donut ? arr[0] : arr[this.btnSelected];
    },
    chartData() {
      if (!this.donut) {
        let daysInMonth = new Date(
          this.date.getFullYear(),
          this.date.getMonth() + 1,
          0
        ).getDate();
        return {
          labels: [...Array(daysInMonth).keys()],
          datasets: [
            {
              label: "收入",
              data: this.getBarData.pos,
              backgroundColor: this.$vuetify.theme.themes.light.income,
              borderColor: this.$vuetify.theme.themes.light.income,
            },
            {
              label: "支出",
              data: this.getBarData.neg,
              backgroundColor: this.$vuetify.theme.themes.light.expense,
              borderColor: this.$vuetify.theme.themes.light.expense,
            },
            {
              label: "總和",
              data: this.getLineData,
              type: "line",
              backgroundColor: this.$vuetify.theme.themes.light.primary,
              borderColor: this.$vuetify.theme.themes.light.primary,
            },
          ],
        };
      }
      if (this.isEmpty) {
        return {
          labels: ["本月無資料"],
          datasets: [
            {
              data: [1],
              backgroundColor: ["#f0f0f0"],
            },
          ],
        };
      }
      if (this.type == "all") {
        return {
          labels: ["收入", "支出"],
          datasets: [this.getBalance],
        };
      }
      return {
        labels: this.getLabels,
        datasets: [
          {
            data: this.getPieData.filter((val) => val != 0),
            backgroundColor: this.getColor,
          },
        ],
      };
    },
    getLabels() {
      let vm = this;
      let ret = this.getWalletTags(this.type)
        .map((item) => {
          return item.tag_name;
        })
        .filter((val, id, arr) => {
          return vm.getPieData[arr.indexOf(val)] != 0;
        });
      return ret;
    },
    getColor() {
      let vm = this;
      return this.getWalletTags(this.type)
        .map((item) => item.tag_color)
        .filter((val, id, arr) => {
          return vm.getPieData[arr.indexOf(val)] != 0;
        });
    },
    getPieData() {
      let arr = [];
      for (let i = 0; i < this.getWalletTags(this.type).length; i++) {
        let sameTag = this.getMonthRecords.filter((rec) => {
          return (
            rec.wallet_record_tag_id == this.getWalletTags(this.type)[i].tag_id
          );
        });
        arr.push(
          sameTag.reduce((tmp, object) => {
            return tmp + object.record_amount;
          }, 0)
        );
      }
      return arr;
    },
    getLineData() {
      let days = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();
      let ret = Array(days).fill(0);
      let tmpRec = this.getMonthRecords.sort((a, b) => {
        return a.record_date > b.record_date ? 1 : -1;
      });
      for (let i = 0, j = 0; i < days; ++i) {
        i == 0 ? (ret[i] = 0) : (ret[i] = ret[i - 1]);
        while (
          j != tmpRec.length &&
          this.strToDate(tmpRec[j].record_date) == i + 1
        )
          ret[i] += tmpRec[j++].record_amount;
      }
      return ret;
    },
    getBarData() {
      let days = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();
      let ret = {
        pos: Array(days).fill(0),
        neg: Array(days).fill(0),
      };
      let tmpRec = this.getMonthRecords;
      for (let i = 0; i < tmpRec.length; ++i) {
        if (tmpRec[i].record_amount > 0)
          ret.pos[this.strToDate(tmpRec[i].record_date) - 1] +=
            tmpRec[i].record_amount;
        else
          ret.neg[this.strToDate(tmpRec[i].record_date) - 1] +=
            tmpRec[i].record_amount;
      }
      return ret;
    },
    getMax() {
      return this.isEmpty
        ? 1
        : Math.max(
            Math.max(...this.getBarData.pos),
            Math.min(...this.getBarData.neg) * -1,
            Math.max(...this.getLineData),
            Math.min(...this.getLineData) * -1
          );
    },
    getRange() {
      return this.date.toISOString().slice(0, 7);
    },
    isEmpty() {
      let sum = 0;
      for (let i = 0; i < this.getPieData.length; ++i)
        sum += this.getPieData[i];
      return sum == 0;
    },
    getBalance() {
      const dataFilter = (type) => {
        return this.getMonthRecords
          .filter((rec) => {
            return rec.record_type == type;
          })
          .reduce((tmp, object) => {
            return tmp + object.record_amount;
          }, 0);
      };
      let ret = {
        data: [dataFilter("income"), dataFilter("expense")],
        backgroundColor: [
          this.$vuetify.theme.themes.light.income,
          this.$vuetify.theme.themes.light.expense,
        ],
      };
      return ret;
    },
  },
};
</script>
