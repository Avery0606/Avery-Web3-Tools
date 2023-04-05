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
        placeholder="请输入内容"
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
    <div>

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
    }
  },
}
</script>

<style lang="less" scoped>
.prediction-list {
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
      margin-left: 1px;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
    }
  }
}
.prediction-list:hover {
  border-color: #409EFF;
}
</style>