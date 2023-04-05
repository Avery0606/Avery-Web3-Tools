<template>
  <div id="app">
    <Header ref="header"/>
    <router-view :style="`height: ${mainContentHeight}px`"/>
  </div>
</template>
<script>
import Header from '@/components/header'
export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      mainContentHeight: 0
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.mainContentHeight = window.innerHeight - this.$refs.header.$el.clientHeight - 30
    }
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
