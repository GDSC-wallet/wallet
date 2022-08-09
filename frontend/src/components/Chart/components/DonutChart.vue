<template>
  <Chart :config="config" :chartId="chartId" />
</template>


<script>

import Chart from "../Main.vue"
export default {
  props: {
    data: Object,
    options: Object,
    chartId: String
  },
  data() {
    return {
      config: {
        type: 'doughnut',
        data: this.data,
        options: this.options
      },
      ctx: document.getElementById(this.chartId)
    }
  },
  components: {
    Chart: Chart
  },
  watch: {
    data() {
      this.config.data = this.data;
    }
  }
}
</script>