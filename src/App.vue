<template>
  <div id="app">
    <Header/>
    <router-view style="height: 85%"/>
  </div>
</template>
<script>
import Header from '@/components/header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
<style lang="less">
body {
  height: 95vh;
  #app {
    height: 100%;
  }
}
</style>
