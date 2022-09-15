<template>
  <v-container>
    <v-row>
      <v-col v-for="n in 3" class="px-1 py-0" cols="4">
        <v-alert
          class="pa-2"
          outlined
          :color="color[n - 1]"
          text
          :icon="icon[n - 1]"
        >
          {{ sum(modes[n - 1]) }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Balance",
  props: {
    displayToday: Boolean,
  },
  data() {
    return {
      modes: ["income", "expense", "all"],
      icon: [
        "mdi-arrow-bottom-left",
        "mdi-arrow-top-right",
        "mdi-compare-vertical",
      ],
      color: [
        this.$vuetify.theme.themes.light.income,
        this.$vuetify.theme.themes.light.expense,
        "primary",
      ],
    };
  },
  methods: {
    sum(str) {
      return this.currentRecord
        .filter((x) => x.record_type == str || str == "all")
        .reduce((acc, cur) => acc + cur.record_amount, 0);
    },
  },
  computed: {
    ...mapGetters({
      curDate: "calendar/getDate",
      records: "wallet/getRecords",
    }),
    currentRecord() {
      let end = new Date(
        this.curDate.getFullYear(),
        this.curDate.getMonth(),
        this.curDate.getDate(),
        23,
        59,
        59
      );
      let start = new Date(
        this.curDate.getFullYear(),
        this.curDate.getMonth(),
        this.displayToday ? this.curDate.getDate() : 1,
        0,
        0,
        0
      );
      return this.records.filter(function (rec) {
        let tmp = new Date(rec.record_date);
        return tmp >= start && tmp <= end;
      });
    },
  },
};
</script>
