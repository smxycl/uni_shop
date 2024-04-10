const state = {
  // 购物车的数组，用来存储购物车中每个商品的信息对象
  // 每个商品的信息对象，都包含如下 6 个属性：
  // { goods_id, goods_name, goods_price, goods_count,
  // goods_small_logo,
  // goods_state
  // }
  cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
}
const mutations = {
  addToCart(state, goods) {
    // 根据提交的商品的Id，查询购物车中是否存在这件商品
    // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
    console.log(goods, 'goods')
    const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
    if (!findResult) {
      // 如果购物车中没有这件商品，则直接 push
      state.cart.push(goods)
      console.log('cart', state.cart)
    } else {
      // 如果购物车中有这件商品，则只更新数量即可
      findResult.goods_count++
    }
    this.commit('saveToStorage')
  },
  // 将加入购物车的物品存储到本地存储中
  saveToStorage(state) {
    uni.setStorageSync('cart', JSON.stringify(state.cart))
  },
  // 更新购物车中商品的勾选状态
  updateGoodsState(state, goods) {
    // 根据 goods_id 查询购物车中对应商品的信息对象
    const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
    // 有对应的商品信息对象
    if (findResult) {
      // 更新对应商品的勾选状态
      findResult.goods_state = goods.goods_state
      // 持久化存储到本地
      this.commit('saveToStorage')
    }
  },
  // 更新购物车中商品的数量
  updateGoodsCount(state,goods){
    // 根据goods_id查询购物车中对用的商品的信息对象
    const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
    console.log('更新购物车中商品的数量',findResult)
    // 找到了对应的商品信息对象
    if(findResult){
      findResult.goods_count=goods.goods_count
      this.commit('saveToStorage')
    }
  },
  removeGoodsById(state,goods_id){
    state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
    this.commit('saveToStorage')
  },
  // 更新购物车全选按钮的选择获取或不选中
  updateAllGoodsState(state,newState){
    console.log(state)
    state.cart.forEach(x=>x.goods_state=newState)
  }

 
}
const getters = {
  // 统计购物车中商品的总数量
  total(state) {
    let c = 0
    // 循环统计商品的数量，累加到变量 c 中
    state.cart.forEach(goods => c += goods.goods_count)
    return c
  },
  // 勾选的商品的总数量
  checkedCount(state) {
  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
  // 再使用 reduce 方法，将已勾选的商品总数量进行累加
  // reduce() 的返回值就是已勾选的商品的总数量
    return state.cart.filter(x => x.goods_state).reduce((total, item) =>total += item.goods_count, 0)
  },
  isAllCheck(state){
    return state.cart.every(item=>item.goods_state===true)
  },
  // 勾选的商品的总价格
  checkedGoodsAmount(state){
    return state.cart.filter(item=>item.goods_state==true).reduce((total,item)=>total+=item.goods_price,0)
  }
}

export default {
  // 模块的 state 数据
  state,
  // 模块的 mutations 方法
  mutations,
  // 模块的 getters 属性
  getters
}
