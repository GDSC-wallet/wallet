<template>
  <div>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    config: Object,
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
      this.mychart = new Chart(
        document.getElementById(this.chartId),
        this.config
      )
      console.log(this.mychart)
    }
  },
  watch: {
    'config.data'() {
      console.log('config change');
      this.mychart.destroy();
      this.init();
    }
  }
}
</script>