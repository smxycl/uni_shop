<template>
  <view class="cart-container" v-if="cart.length!==0">
    <my-address></my-address>
    <!-- 商品列表标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 文字 -->
      <view class="cart-title-text">购物车</view>
    </view>
    <!-- 商品列表区域 -->
    <!-- uni-swipe-action 是最外层包裹性质的容器 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过
    options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :options="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler">
          </my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    computed: {
      ...mapState({
        cart: (state) => state.cart.cart
      }),

    },
    methods: {
      radioChangeHandler(e) {
        this.$store.commit('updateGoodsState', e)
      },
      numberChangeHandler(e) {
        this.$store.commit('updateGoodsCount', e)
      },
      // 点击了滑动操作按钮--删除购物车中物品
      swipeActionClickHandler(goods){
        this.$store.commit('removeGoodsById',goods.goods_id)
        
      }
    }



  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }

    .goods-item {
      // 让 goods-item 项占满整个屏幕的宽度
      width: 750rpx;
      // 设置盒模型为 border-box
      box-sizing: border-box;
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
