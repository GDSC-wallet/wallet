<template>
  <div>
    <MonthSelector v-model="date" />
    <Chart :data="test" :options="{}" type="doughnut" chartId="123" />
  </div>
</template>

<script>
import Chart from "@/components/Chart/Main.vue"
import MonthSelector from "@/components/Calendar/components/MonthSelector.vue"
export default {
  name: "Statics",
  components: {
    Chart: Chart,
    MonthSelector: MonthSelector
  },
  data() {
    return {
      date: new Date()
    }
  },
  methods: {
    changeDate(v) {
      console.log(v)
    }
  },  
  computed: {
    test() {
      return {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    }
  }
}
</script>