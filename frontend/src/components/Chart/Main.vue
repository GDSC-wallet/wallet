<template>
  <div>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    type: String,
    data: Object,
    options: Object,
    chartId: String
  },
  data() {
    return {
      mychart: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const config = {
        type: this.type,
        data: this.data,
        options: this.options
      };
      this.mychart = new Chart(
        document.getElementById(this.chartId),
        config
      )
      console.log(this.mychart)
    }
  },
  watch: {
    Options() {
      this.mychart.options = this.Options
      this.mychart.update('none')
    },
    ChartData() {
      this.mychart.data = this.ChartData
      this.mychart.update('none')
    }
  }
}
</script>