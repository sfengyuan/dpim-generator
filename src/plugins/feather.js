import feather from 'feather-icons'

export default {
  install (Vue, options) {
    Vue.mixin({
      mounted () {
        feather.replace()
      }
    })
  }
}
