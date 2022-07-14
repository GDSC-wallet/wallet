<template>
  <div>
    <vc-date-picker 
      v-model="date"
      :attributes="statusBar"
      is-expanded
      is-required
      @update:to-page="toPage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Calendar",
  data() {
    return {};
  },
  mounted() { },
  methods: {
    toPage(e) {
      // First check if date is equal to score's date,
      // because render will trigger this function.
      if (e.month != this.date.getMonth() + 1 || e.year != this.date.getFullYear()) {
        this.date = new Date(new Date(this.date.setMonth(e.month - 1)).setFullYear(e.year))
      }
    }
  },
  computed: {
    ...mapGetters({
      getRecords: "wallet/getRecords"
    }),
    date: {
      get() {
        return this.$store.getters["calendar/getDate"];
      },
      set(value) {
        this.$store.dispatch("calendar/setDate", value)
      }
    },
    statusBar() {
      let incomeDates = [];
      let expenseDates = [];
      this.getRecords.map(record => {
        if (record.record_type === "income") {
          incomeDates.push(new Date(record.record_date))
        } else if (record.record_type === "expense") {
          expenseDates.push(new Date(record.record_date))
        }
      })
      return [{bar: true, dates: incomeDates},{bar: "red", dates: expenseDates}]
    }
  },
};
</script>