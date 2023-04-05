<template>
  <div class="card-box gas-prediction">
    <h2>
      Gas Prediction
      <el-button style="margin-left: 5px" @click="reset('gasData')">重置</el-button>
    </h2>
    <el-form
      :inline="true"
      :model="gasData"
      class="input-form"
      :label-width="labelWidth"
    >
      <el-form-item label="Gas limit">
        <el-input v-model.number="gasData.gasLimit" placeholder="燃料限制" clearable>
          <template #suffix>单位</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Base Price">
        <el-input v-model="gasData.basePrice" placeholder="基本费用" clearable>
          <template #suffix>GWEI</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Max Priority">
        <el-input v-model="gasData.maxPriority" placeholder="优先费用(小费)" clearable>
          <template #suffix>GWEI</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Gas Cost">
        <el-input 
          v-model="gasData.gasCost" 
          class="gas-cost-input" 
          placeholder="Gas预测花费"
          readonly
          @click.native="copyValueToClipBoard(gasData.gasCost)"
        >
          <template #suffix>ETH</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { copyText } from '@/utils/clipboard'
import storeMixin from '@/mixins/store'
export default {
  name: 'GasPrediction',
  mixins: [storeMixin],
  data() {
    return {
      gasData: {
        gasLimit: '',
        basePrice: '',
        maxPriority: '',
        gasCost: ''
      },
      storageKey: 'gasPrediction_gasData',
      labelWidth: '100px'
    }
  },
  computed: {
    canGasPredict() {
      const {
        gasLimit,
        basePrice,
        maxPriority,
      } = this.gasData
      if (
        gasLimit === ''
        || basePrice === ''
        || maxPriority === ''
      ) {
        return false
      }
      return true
    }
  },
  watch: {
    'gasData.gasLimit'() {
      this.handleGasPrediction()
    },
    'gasData.basePrice'() {
      this.handleGasPrediction()
    },
    'gasData.maxPriority'() {
      this.handleGasPrediction()
    },
  },
  mounted() {
    const storageGasData = this.getStorageData(this.storageKey)
    if (typeof storageGasData === 'object') {
      this.gasData = { ...storageGasData }
    }
  },
  methods: {
    // Gas测算
    handleGasPrediction() {
      this.storeData(this.storageKey, this.gasData)
      if (!this.canGasPredict) {
        return
      }
      const {
        gasLimit,
        basePrice,
        maxPriority,
      } = this.gasData
      this.gasData.gasCost = gasLimit * (basePrice / 1 +  maxPriority / 1) / 1000000000 
    },
    copyValueToClipBoard(value) {
      copyText(value).then(() => {
        this.$message.success('复制成功')
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 重置
    reset(key) {
      const resetItem = this[key]
      Object.keys(resetItem).forEach(key => {
        resetItem[key] = ''
      })
    },
  }
}
</script>

<style lang="less" scoped>
.gas-prediction {
  flex: 1;
  margin-top: 5px;
  h2 {
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
  }
  .input-form {
    text-align: center;
  }
  /deep/.gas-cost-input input, .gas-cost-input input:hover, .gas-cost-input input:focus{
    border-color: #67C23A;
  }
  /deep/.gas-cost-input, /deep/.gas-cost-input input {
    cursor: pointer;
  }
}
.card-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  padding: 10px;
  padding-top: 0px
}
.card-box:hover {
  border-color: #409EFF;
}
</style>