<template>
  <div class="card-box nft-calculator">
    <h2> NFT Calculator </h2>
    <el-form 
      :inline="true" 
      :model="formData" 
      :label-width="labelWidth"
      class="input-form"
    >
      <el-form-item label="Entry Price">
        <el-input 
          v-model="formData.entryPrice"
          placeholder="买入价格"
          clearable
        >
          <template #suffix>
            ETH
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Royalty">
        <el-input v-model="formData.royalty" placeholder="版税" clearable>
          <template #suffix>
            %
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form 
      :inline="true" 
      :model="formData" 
      :label-width="labelWidth"
      class="input-form"
    >
      <el-form-item label="Buy Gas">
        <el-input 
          v-model="formData.buyGas" 
          placeholder="购买花费GAS"
          clearable
        >
          <template #suffix>
            ETH
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Approve Gas">
        <el-input 
          v-model="formData.approveGas" 
          placeholder="授权花费GAS"
          clearable
        >
          <template #suffix>
            ETH
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form 
      :inline="true" 
      :model="formData" 
      :label-width="labelWidth"
      class="input-form"
    >
      <el-form-item label="Exit Price">
        <el-input 
          v-model="formData.exitPrice" 
          placeholder="卖出价格"
          @input="handleExitPriceInput"
          clearable
        >
          <template #suffix>
            ETH
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Profit">
        <el-input 
          v-model="formData.profit" 
          placeholder="利润"
          :class="formData.profit > 0 ? 'make-profit' : 'loss-money'"
          @input="handleProfitInput"
          clearable
        >
          <template #suffix>
            ETH
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true" 
      :model="formData" 
      label-width="105"
      class="input-form"
    >
      <el-form-item label="Profit Margin">
        <el-input
          v-model="formData.profitMargin"
          @input="handleProfitMarginInput"
          placeholder="利润率"
          clearable
        >
          <template #suffix>%</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storeMixin from '@/mixins/store'
export default {
  name: 'NftCalculator',
  mixins: [storeMixin],
  data() {
    return {
      formData: {
        entryPrice: '',
        exitPrice: '',
        royalty: '',
        buyGas: '',
        approveGas: '',
        profit: '',
        profitMargin: 0,
      },
      storageKey: 'nftCalculator_formData',
      labelWidth: '100px'
    }
  },
  computed: {
    cost() {
      const {
        entryPrice,
        buyGas,
        approveGas
      } = this.formData
      return (entryPrice / 1) + (buyGas / 1) + (approveGas / 1)
    },
    formatRoyalty() {
      return this.formData.royalty / 100
    },
    formatProfitMargin() {
      return this.formData.profitMargin / 100
    },
    canNFTCalculate() {
      const {
        entryPrice,
        buyGas,
        approveGas,
        royalty
      } = this.formData
      if (
        entryPrice === '' 
        || buyGas === '' 
        || approveGas === '' 
        || royalty === ''
      ) {
        return false
      }
      return true
    },
  },
  watch: {
    'formData.entryPrice'() {
      this.calculateExitPriceAndProfit()
    },
    'formData.royalty'() {
      this.calculateExitPriceAndProfit()
    },
    'formData.buyGas'() {
      this.calculateExitPriceAndProfit()
    },
    'formData.approveGas'() {
      this.calculateExitPriceAndProfit()
    },
  },
  mounted() {
    const storageFormData = this.getStorageData(this.storageKey)
    if (typeof storageFormData === 'object') {
      this.formData = { ...storageFormData }
    }
  },
  methods: {
    calculateExitPriceAndProfit() {
      this.storeData(this.storageKey, this.formData)
      if (!this.canNFTCalculate) {
        return
      }
      this.formData.exitPrice = this.cost * (1 + this.formatProfitMargin) / (1 - this.formatRoyalty)
      this.formData.profit = this.formData.exitPrice * (1 - this.formatRoyalty) - this.cost
    },
    // 输入卖出价格
    handleExitPriceInput(val) {
      this.storeData(this.storageKey, this.formData)
      if (!this.canNFTCalculate || val === '') {
        return
      }
      this.formData.profit = this.formData.exitPrice * (1 - this.formatRoyalty) - this.cost
      this.formData.profitMargin = this.formData.profit / this.formData.entryPrice * 100
    },
    // 输入利润
    handleProfitInput(val) {
      this.storeData(this.storageKey, this.formData)
      if (!this.canNFTCalculate || val === '') {
        return
      }
      this.formData.exitPrice = (this.cost + (this.formData.profit) / 1) / (1 - this.formatRoyalty)
      this.formData.profitMargin = this.formData.profit / this.formData.entryPrice * 100
    },
    // 输入利润率
    handleProfitMarginInput(val) {
      this.storeData(this.storageKey, this.formData)
      if (!this.canNFTCalculate || val === '') {
        return
      }
      this.calculateExitPriceAndProfit()
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
.nft-calculator {
  h2 {
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: center;
  }
  .input-form {
    text-align: center;
  }
  /deep/.make-profit input, .make-profit input:hover, .make-profit input:focus {
    border-color: #67C23A;
  }
  /deep/.loss-money input, .loss-money input:hover, .loss-money input:focus {
    border-color: #F56C6C;
  }
}
.card-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  padding: 10px;
  padding-top: 0px;
}
.card-box:hover {
  border-color: #409EFF;
}
</style>