<template>
<div class="graph">
  <Bar-chart v-for="data in echartsData" :chartData="data" :key="data.id" />
</div>
</template>

<script>
import BarChart from './BarChart.vue'

export default {
  name: 'Graph',
  props: ['stats'],
  computed: {
    echartsData () {
      if (!Array.isArray(this.stats)) {
        return []
      } else {
        return this.stats
      }
    }
  },
  components: {
    BarChart
  }
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.graph {
  padding: 1rem;
}
</style>
