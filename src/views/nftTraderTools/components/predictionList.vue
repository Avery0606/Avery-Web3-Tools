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
        v-for="item in showPredictionList"
        :key="item.id"
        shadow="hover"
        :style="`border: 1px solid ${getStatusColor(item.status)}`"
      >
        <template #header>
          <span style="font-weight: bold">{{ item.collectionData.name }}</span>
          <div style="float: right">
            <el-button
              v-if="item.isShowStatus"
              size="mini"
              :type="buttonTypeOfStatus(item.status)"
              @click="item.isShowStatus = false"
            >
              {{ item.status }}
            </el-button>
            <div v-else class="item-status-button">
              <i 
                class="el-icon-success" 
                style="color: #67C23A"
                @click="handleItemStatusBtnClick(item, 'Success')"
              >
              </i>
              <i 
                class="el-icon-s-help" 
                style="color: #909399"
                @click="handleItemStatusBtnClick(item, 'Predicting')"
              >
              </i>
              <i 
                class="el-icon-error" 
                style="color: #F56C6C"
                @click="handleItemStatusBtnClick(item, 'Fail')"
              >
              </i>
            </div>
          </div>
          <el-popover
            placement="bottom"
            width="160"
            v-model="item.isShowDeleteConfirm"
          >
            <p>确定删除该预测吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button type="info" size="mini" @click="item.isShowDeleteConfirm = false">取消</el-button>
              <el-button type="danger" size="mini" @click="deletePredictItem(item.id)">确定</el-button>
            </div>
            <i slot="reference" class="el-icon-circle-close delete-btn" ></i>
          </el-popover>
        </template>
        <div class="list-content">
          <p>买入价格：{{ item.formData.entryPrice }} ETH</p>
          <p>花费GAS：{{ (item.formData.buyGas / 1) + (item.formData.approveGas / 1) }} ETH</p>
          <p>预期卖出价格：{{ item.formData.exitPrice }} ETH</p>
          <p>可获利润：{{ item.formData.profit | filterNumber(4) }} ETH</p>
          <p>回报率：{{ item.formData.profitMargin | filterNumber(2) }} %</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import storeMixin from '@/mixins/store'
export default {
  name: 'PredictionList',
  mixins: [storeMixin],
  data() {
    return {
      title: 'Prediction List',
      searchInput: {
        text: '',
        options: []
      },
      predictionList: [],
      storageKey: 'predictionList'
    }
  },
  computed: {
    showPredictionList() {
      return this.predictionList.filter((item) => {
        return (
          item.collectionData.name.includes(this.searchInput.text)
          && (!this.searchInput.options.length || this.searchInput.options.includes(item.status))
        )
      })
    }
  },
  filters: {
    // 保留n位小数
    filterNumber(text, n) {
      return (text / 1).toFixed(n)
    }
  },
  mounted() {
    const storagePredictionList = this.getStorageData(this.storageKey)
    if (typeof storagePredictionList === 'object') {
      this.predictionList = [ ...storagePredictionList ]
    }
  },
  methods: {
    // 增加卡片
    handleAddPredictData(predictData) {
      this.predictionList.unshift({
        ...predictData,
        status: 'Predicting',
        isShowStatus: true,
        isShowDeleteConfirm: false,
        id: new Date().getTime()
      })
      this.storeData(this.storageKey, this.predictionList)
    },
    // 删除卡片
    deletePredictItem(id) {
      const length = this.predictionList.length
      try {
        for (let i = 0; i < length; i++) {
          if (this.predictionList[i].id === id) {
            this.predictionList.splice(i, 1)
            break
          }
        }
        this.$message.success('删除成功')
        this.storeData(this.storageKey, this.predictionList)
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 状态切换点击
    handleItemStatusBtnClick(item, status) {
      item.status = status
      item.isShowStatus = true
      this.storeData(this.storageKey, this.predictionList)
    },
    // 按钮状态
    buttonTypeOfStatus(status) {
      switch (status) {
        case 'Success':
          return 'success'
        case 'Fail':
          return 'danger'
        default:
          return 'info'
      }
    },
    // 状态颜色
    getStatusColor(status) {
      switch (status) {
        case 'Success':
          return '#67C23A'
        case 'Fail':
          return '#F56C6C'
        case 'Predicting':
          return '#909399'
        default:
          return '#909399'
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
    padding-right: 5px;
    .el-card {
      margin-top: 5px;
      position: relative;
      .delete-btn {
        position: absolute;
        top: 2px;
        right: 2px;
        cursor: pointer;
        transition: 1s;
      }
      .delete-btn:hover {
        color: #F56C6C
      }
    }
    /deep/.el-card__body {
      padding: 0;
      padding-left: 10px;
    }
    .item-status-button i {
      cursor: pointer;
      margin-left: 5px;
      transition: 1s;
    }
    .item-status-button i:hover {
      transform: scale(1.2);
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