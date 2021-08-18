<template>
<div class="loader" v-if="isLoading">
  <div class="lds-dual-ring"></div>
</div>
</template>

<script>
export default {
  name: 'Loader',
  props: ['isLoading']
}
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
.loader {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgb(255, 255, 255);
  z-index: 99999;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #15824b;
  border-color: #15824b transparent #15824b transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
