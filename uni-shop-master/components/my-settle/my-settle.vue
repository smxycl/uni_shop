<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio">
      <radio color="#C00000" :checked="isAllCheck" @click="updateAllState(isAllCheck)" id="btn"/><text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥1234.00</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
      
      };
    },
    computed:{
      ...mapGetters(['checkedCount','isAllCheck','checkedGoodsAmount','addstr']),
      ...mapState({
        addstr:state=>state.user.token
      })
    },
    methods:{
      //  修改购物车中所有商品的选中状态
      updateAllState(isAllCheck){
        console.log('this.isAllCheck',this.isAllCheck)
        console.log('isAllCheck',isAllCheck)
        this.$store.commit('updateAllGoodsState',!isAllCheck)
      },
      
      // 点击结算按钮，进行结算
      settlement(){
        // 1. 判断用户是否勾选了要结算的商品
        // 2. 判断用户是否选择了收货地址
        // 3. 判断用户是否登陆了
        if(!this.checkedCount) return uni.$showMsg('请勾选要购买的商品')
        if(!this.addstr) return uni.$showMsg('请选择收货地址')
        if(!this.token) return uni.$showMsg('请先登录！')
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    // 将背景色从 cyan 改为 white
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount {
      color: #c00000;
    }

    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>
