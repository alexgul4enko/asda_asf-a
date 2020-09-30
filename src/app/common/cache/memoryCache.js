function memoryCache() {
  var storageData = {}
  this.getData = function() {
    return storageData
  }
  this.setData = function(data) {
    storageData = { ...storageData, ...data }
  }
}

export default new memoryCache()
