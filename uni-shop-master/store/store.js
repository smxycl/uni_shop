// 1. 导入 Vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 2. 将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)
// 1. 导入购物车的 vuex 模块
import cart from './cart.js'
import user from './user.js'

// 3. 创建 Store 的实例对象
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
    // 2. 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
    // 购物车模块中 cart 数组的访问路径是 m_cart/cart
   cart,user
  },

})
// 4. 向外共享 Store 的实例对象
export default store
