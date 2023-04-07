<template>
  <div id="nftTraderTools">
    <div class="left-box">
      <NftCalculator @addToPredictList="addToPredictList"/>
      <GasPrediction/>
    </div>
    <div class="right-box">
      <PredictionList ref="predictionList"/>
    </div>
  </div>
</template>

<script>
import NftCalculator from './components/nftCalculator'
import GasPrediction from './components/gasPrediction'
import PredictionList from './components/predictionList'
export default {
  name: 'NftTraderTools',
  components: {
    NftCalculator,
    GasPrediction,
    PredictionList
  },
  methods: {
    addToPredictList(predictData) {
      this.$refs.predictionList.handleAddPredictData(predictData)
    }
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
    height: 100%;
    padding: 5px;
  }
}
</style>