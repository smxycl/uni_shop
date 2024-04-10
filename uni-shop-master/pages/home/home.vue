<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch">123</my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航栏区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in navList" :key="i">
        <image class="nav-img" :src="item.image_src" @click="navClickHandler(item)"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层item项 -->
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image class="floor-title" :src="item.floor_title.image_src"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片盒子 -->
          <view class="let-img-box">
            <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
          </view>
          <!--右侧4个小盒子图片  -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0">
              <image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        // 1. 轮播图数据列表
        swiperList: [],
        // 2. 导航条列表
        navList: [],
        // 3. 楼层的数据列表
        floorList: [],
      };
    },
    onLoad() {
      this.getSwiperList();
      this.getNavList();
      this.getFloorList()
    },
    methods: {
      // 得到轮播图的数据
      async getSwiperList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        console.log(res)
        // 3.2 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 3.3 请求成功，为 data 中的数据赋值
        this.swiperList = res.message
      },
      // 得到导航栏的数据
      async getNavList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        console.log(res, "getNav")
        if (res.meta.status !== 200) {
          uni.showToast({
            title: '数据加载失败',
            icon: 'none'
          })
        }
        this.navList = res.message
      },
      // 得到楼层页面的数据
      async getFloorList() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.floorList = res.message
      },
      // 点击分类导航，切换到分类页面
      navClickHandler(item) {
        console.log(item.name)
        if (item.name === '分类') {
          uni.switchTab({
            url: "pages/cate/cate"
          })
        }
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;

  }

  // 1. 轮播图
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 2. 分类导航
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15rpx 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  // 3. 楼层区域
  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
</style>
