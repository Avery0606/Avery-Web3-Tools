<template>
  <div id="appHeader">
    <el-menu 
      :default-active="activeIndex" 
      :router="true"
      mode="horizontal"
      class="header-menu"
    >
      <el-menu-item index="nftTraderTools">NFT交易工具</el-menu-item>
      <el-menu-item index="otherTools">其他工具</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: 'nftTraderTools'
    }
  }
}
</script>

<style lang="less" scoped>
#appHeader {
  .header-menu {
    display: flex;
    justify-content: center;
  }
}
</style>