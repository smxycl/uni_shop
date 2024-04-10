const state = {
  // 3. 读取本地的收货地址数据，初始化 address 对象
  address: JSON.parse(uni.getStorageSync('address') || '{}'),
  // token:uni.getStorageSync('token') || '',
  token:'',
  userInfo: JSON.parse(uni.getStorageSync('userInfo')||'{}')
}
const mutations = {
  // 更新收货地址
  updateAddress(state, address) {
    state.address = address
    // 2. 通过 this.commit() 方法，调用 m_user 模块下的
    // saveAddressToStorage 方法将 address 对象持久化存储到本地
    this.commit('saveAddressToStorage')
  },
  // 1. 定义将 address 持久化存储到本地 mutations 方法
  saveAddressToStorage(state) {
    uni.setStorageSync('address', JSON.stringify(state.address))
  },
  updateUserInfo(state, userInfo) {
    state.userInfo = userInfo
    this.commit('saveUserInfoToStorage')
  },
  saveUserInfoToStorage(state) {
    uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
  },
  updateToken(state,token){
    state.token=token
    this.commit('saveTokenToStorage')
  },
  saveTokenToStorage(){
    uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
  }
}
// 数据包装器
const getters = {
  // 收货详细地址的计算属性
  addstr(state) {
    if (!state.address.provinceName) return ''
    // 拼接 省，市，区，详细地址 的字符串并返回给用户
    return state.address.provinceName + state.address.cityName +
      state.address.countyName + state.address.detailInfo
  },
  
}

export default {
  // state 数据
  state,
  mutations,
  getters
}
