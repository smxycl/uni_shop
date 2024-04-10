<template>
  <view v-if="goods_info.goods_name">
    <!-- 轮播图区域 -->
    <!-- :autoplay="true" :interval="3000" :duration="1000" -->
    <swiper :indicator-dots="true" circular="true" autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- 商品主体 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name"> {{goods_info.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递，免运费</view>
    </view>
    <!-- 商品详情 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航 -->
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  // 从 vuex 中按需导出 mapState 辅助方法
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        // 商品信息
        goods_info: {},
        options: [{
            icon: 'headphones',
            text: '客服'
          },
          {
            icon: 'cart',
            text: '购物车'
          }
        ],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    computed: {
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算
      // 属性来使用
      // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
      // ...mapState('m_cart', ['cart']),
      ...mapGetters(['total'])
    },
    watch: {
      // 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
      // total(newValue){
      //   console.log(newValue)
      //   console.log(this.options)
      //   // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
      //   const findResult=this.options.find((x) => x.text === '购物车')
      //   console.log(findResult,'findResult')
      //   if (findResult) {
      //   // 3. 动态为购物车按钮的 info 属性赋值
      //   findResult.info = newValue
      //   }
      // }
      total: {
        // 1. 监听 total 值的变化，通过第一个形参得到变化后的新值
        handler(newValue) {
          // 2. 通过数组的 find() 方法，找到购物车按钮的配置对象
          const findResult = this.options.find((x) => x.text === '购物车')
          if (findResult) {
            // 3. 动态为购物车按钮的 info 属性赋值
            findResult.info = newValue
          }
        },
        immediate: true
      }
    },
    onLoad(options) {
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      // 预览图片效果
      // 实现轮播图的预览效果
      preview(i) {
        // 调用 uni.previewImage() 方法预览图片
        uni.previewImage({
          // 预览时，默认显示图片的索引
          current: i,
          // 所有图片 url 地址的数组
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      // ...mapMutations('m_cart', ['addToCart']),
      // 得到商品详情
      async getGoodsDetail(goods_id) {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        // 使用字符串的replace()方法和正则表达式，为Img标签添加行内的style样式，从而解决图片底部空白间隙的问题
        res.message.goods_introduce.replace(/<img/g, '<img style="display:block;"').replace(/wepp/g, 'jpg')
        this.goods_info = res.message
      },
      // 点击左侧按钮“购物车”，进入cart页面
      onClick(e) {
        if (e.content.text == '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        if (e.content.text == '加入购物车') {
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }
          this.$store.commit('addToCart', goods)
        }
      }
    }
  }
</script>

<style lang="scss">
  /* 轮播图区域 */
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品信息区域
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #C00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        flex: 1;
        font-size: 13px;
        border-right: 2px solid #efefef;
        padding-right: 10px;
      }

      .favi {
        width: 60px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: gray;
      }

    }

    // 收藏
    .yf {
      font-size: 12px;
      color: gray;
      margin: 10px 0;
    }
  }

  // 商品导航
  .goods-detail-container {
    // 给页面外层的容器，添加 50px 的内padding，
    // 防止页面内容被底部的商品导航组件遮盖
    padding-bottom: 50px;
  }

  .goods_nav {
    // 为商品导航组件添加固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
