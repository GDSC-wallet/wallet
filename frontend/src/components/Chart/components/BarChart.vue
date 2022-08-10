<template>
  <Chart :config="config" :chartId="chartId" />
</template>


<script>

import Chart from "../Main.vue"
export default {
  props: {
    data: Object,
    options: Object,
    chartId: String,
    max: Number,
  },
  data() {
    return {
      config: {
        type: 'bar',
        data: null,
        options: {
          radius: 0,
          scales: {
            y: {
              min: null,
              max: null,
              display: false
            }
          },
        },
      },
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.config.data = this.data;
      this.config.options.scales.y.max = this.max * -1;
      this.config.options.scales.y.min = this.max;
    }
  },
  watch: {
    data() {
      this.init();
    },
  },
  components: {
    Chart: Chart
  }
}
</script>