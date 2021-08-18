import Vue from 'vue'
import App from './App.vue'
import echarts from './plugins/echarts'
// import feather from './plugins/feather'

Vue.use(echarts)
// Vue.use(feather)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
