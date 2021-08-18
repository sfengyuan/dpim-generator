<template>
  <div>
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
export default {
  name: 'BarChart',
  props: ['chartData'],
  data () {
    return {
      chart: undefined
    }
  },
  methods: {
    showGraph () {
      const { title, data } = this.chartData
      this.chart.setOption({
        title: {
          text: title
        },
        tooltip: {},
        xAxis: {
          data: data[0],
          axisLabel: {
            interval: title === '字频' ? 15 : 0
          }
        },
        yAxis: {},
        series: [{
          name: title,
          type: 'bar',
          data: data[1]
        }]
      })
    }
  },
  watch: {
    chartData (newVal, oldVal) {
      this.showGraph()
    }
  },
  mounted () {
    this.chart = this.$echarts.init(this.$refs.bar)
    this.showGraph()
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.bar {
  width: auto; height: 300px;
}
</style>
