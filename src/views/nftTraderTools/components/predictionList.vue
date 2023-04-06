<template>
  <div class="prediction-list">
    <!-- 标题 -->
    <div class="title">
      <span>{{title}}</span>
    </div>

    <!-- 搜索框 -->
    <div style="margin-top: 5px">
      <el-input 
        v-model="searchInput.text"
        size="medium"
        prefix-icon="el-icon-search"
        class="search-input"
        placeholder="请输入集合名称"
      >
        <template #suffix>
          <el-checkbox-group 
            v-model="searchInput.options" 
            size="small"
            text-color="#409eff"
            fill="#ecf5ff"
          >
            <el-checkbox-button label="Success" class="input-suffix-button"></el-checkbox-button>
            <el-checkbox-button label="Fail" class="input-suffix-button"></el-checkbox-button>
            <el-checkbox-button label="Predicting" class="input-suffix-button"></el-checkbox-button>
          </el-checkbox-group>
        </template>
      </el-input>
    </div>

    <!-- 列表 -->
    <div class="list-box">
      <el-card
        v-for="item in predictionList"
        :key="item.createdTime"
        shadow="hover"
      >
        <template #header>
          <span style="font-weight: bold">{{ item.collectionData.name }}</span>
          <div style="float: right">
            <el-button
              v-if="item.isShowStatus"
              size="mini"
              :type="buttonTypeOfStatus(item.status)"
            >
              {{ item.status }}
            </el-button>
          </div>
        </template>
        <div class="list-content">
          <p>买入价格：{{ item.formData.entryPrice }} ETH</p>
          <p>花费GAS：{{ (item.formData.buyGas / 1) + (item.formData.approveGas / 1) }} ETH</p>
          <p>预期卖出价格：{{ item.formData.exitPrice }} ETH</p>
          <p>可获利润：{{ item.formData.profit }} ETH</p>
          <p>回报率：{{ item.formData.profitMargin }}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PredictionList',
  data() {
    return {
      title: 'Prediction List',
      searchInput: {
        text: '',
        options: []
      },
      predictionList: [{
        collectionData: {
          name: 'Gemesis',
          contractAddress: ''
        },
        formData: {
          entryPrice: '',
          exitPrice: '',
          royalty: '',
          buyGas: '',
          approveGas: '',
          profit: '',
          profitMargin: 0,
        },
        status: 'Success',
        createdTime: '2023-01-03',
        isShowStatus: true
      }]
    }
  },
  methods: {
    buttonTypeOfStatus(status) {
      switch (status) {
        case 'Success':
          return 'success'
        case 'Fail':
          return 'danger'
        default:
          return 'info'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.prediction-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  padding: 5px;
  .title {
    font-weight: bold;
  }
  .search-input {
    /deep/.el-input__suffix {
      display: flex;
      align-items: center;
    }
    /deep/.input-suffix-button span {
      padding: 5px;
      margin-left: 3px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
  }
  .list-box {
    flex: 1;
    overflow: auto;
    margin-top: 5px;
    /deep/.el-card__body {
      padding: 0;
      padding-left: 10px;
    }
    .list-content {
      line-height: 0.5rem;
      font-size: 12px;
      font-weight: 600;
      font-family: SF Pro SC,SF Pro Text,SF Pro Icons,PingFang SC,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
  }
}
</style>