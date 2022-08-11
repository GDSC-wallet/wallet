<template>
  <div>
    <vc-date-picker v-model="date" :attributes="statusBar" is-expanded is-required @update:to-page="toPage"
      ref="calendar">
      <template v-slot:footer>
        <div>
          <v-btn small text outlined @click="toToday" class="back-to-today-btn">
            today
          </v-btn>
        </div>
      </template>
    </vc-date-picker>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "Calendar",
  data() {
    return {};
  },
  mounted() { },
  methods: {
    ...mapActions({
      setDate: "calendar/setDate"
    }),
    toPage(e) {
      // First check if date is equal to score's date,
      // because render will trigger this function.
      if (e.month != this.date.getMonth() + 1 || e.year != this.date.getFullYear()) {
        this.date = new Date(new Date(this.date.setMonth(e.month - 1)).setFullYear(e.year))
      }
    },
    toToday() {
      const calendar = this.$refs.calendar;
      calendar.move(new Date());
      this.setDate(new Date());
    }
  },
  computed: {
    ...mapGetters({
      getRecords: "wallet/getRecords",
      getDate: "calendar/getDate",
    }),
    date: {
      get() {
        return this.getDate;
      },
      set(value) {
        this.setDate(value)
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
      return [{ bar: true, dates: incomeDates }, { bar: "red", dates: expenseDates }]
    }
  },
};
</script>

<style scoped>
.back-to-today-btn {
  z-index: 4;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>