<template>
  <div id="nftTraderTools">
    <div class="left-box">
      <NftCalculator/>
      <GasPredictionVue/>
    </div>
    <div class="right-box">

    </div>
  </div>
</template>

<script>
import NftCalculator from './components/nftCalculator'
import GasPredictionVue from './components/gasPrediction'
export default {
  name: 'NftTraderTools',
  components: {
    NftCalculator,
    GasPredictionVue
  }
}
</script>

<style lang="less" scoped>
#nftTraderTools {
  display: flex;
  .left-box {
    display: flex;
    flex-direction: column;
    width: 70%;
    height: 100%;
    padding: 5px;
  }
  .right-box {
    flex: 1;
  }
}
</style>