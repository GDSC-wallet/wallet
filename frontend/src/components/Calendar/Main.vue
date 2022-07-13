<template>
  <div>
    <vc-date-picker v-model="date" is-expanded is-required @update:to-page="toPage" />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toPage(e) {
      // First check if date is equal to score's date,
      // because render will trigger this function.
      if(e.month != this.date.getMonth() + 1 || e.year != this.date.getFullYear()) {
        this.date = new Date(new Date(this.date.setMonth(e.month - 1)).setFullYear(e.year))
      } 
    }
  },
  computed: {
    date: {
      get() {
        return this.$store.getters["calendar/getDate"];
      },
      set(value) {
        this.$store.dispatch("calendar/setDate", value)
      }
    },
  },
};
</script>