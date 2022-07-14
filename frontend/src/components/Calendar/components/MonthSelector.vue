<template>
  <v-sheet class="d-flex align-canter">
    <v-btn icon @click="prevMonth">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <div class="flex-grow-1 text-center d-flex justify-space-between align-canter" >
      <div class="reserve-space">
        <v-btn icon @click="date = new Date()" v-if="showBackToThisMonth">
        <v-icon>mdi-calendar-check</v-icon>
      </v-btn>
      </div>
      <h3>{{ date.getMonth() + 1 }}月 {{ date.getFullYear() }}</h3>
      <div class="reserve-space"></div>
    </div>
    <v-btn icon @click="nextMonth">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  name: "MonthSelector",
  props: {
    value: Date
  },
  methods: {
    nextMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1))
    },
    prevMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
    }
  },
  computed: {
    date: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      }
    },
    showBackToThisMonth() {
      const currentDate = new Date()
      return this.date.getFullYear() != currentDate.getFullYear() || this.date.getMonth() != currentDate.getMonth();
    }
  },
}
</script>

<style lang="scss">
@import 'vuetify/src/components/VBtn/_variables.scss';

.reserve-space {
  min-width: map-get($btn-sizes, "default") * 1px;
}
</style>