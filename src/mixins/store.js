export default {
  methods: {
    // 设置本地缓存
    storeData(key) {
      window.localStorage.setItem(key, JSON.stringify(this[key]))
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