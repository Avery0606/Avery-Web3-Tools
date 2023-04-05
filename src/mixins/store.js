export default {
  methods: {
    // 设置本地缓存
    storeData(key, data) {
      window.localStorage.setItem(key, JSON.stringify(data))
    },
    // 获取本地缓存
    getStorageData(key) {
      const item = window.localStorage.getItem(key)
      try {
        return JSON.parse(item)
      } catch (error) {
        return undefined
      }
    }
  }
}