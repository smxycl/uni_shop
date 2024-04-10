<template>
  <view class="goods-item">
    
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image class="goods-pic" :src="goods.goods_small_logo||defaultPic"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{goods.goods_price }}</view>
        <!-- 商品数量 -->
        <!-- 在用户每次输入内容之后，都会触发 inputValue 侦听器，从而调用this.$emit("change", newVal) 方法。这种做法可能会把不合法的内容传递出去！所以我们去组件的封装函数中去改正 -->
        <!-- 
        min	Number	0	最小值  max	Number	100	最大值   change:输入框值改变时触发的事件，参数为输入框当前的 value-->
        <uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler" v-if="showNum">></uni-number-box>
      </view>

    </view>
  </view>
  </view>

</template>

<script>
  export default {
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品信息对象
      goods: {
        type: Object,
        default: {}
      },
      // 是否展示图片左侧
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false
      },
      // 是否展示价格右侧的 NumberBox 组件
      showNum: {
      type: Boolean,
      default: false,
      },
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },

    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    onLoad() {
      console.log('this.goods',this.goods)
    },
    methods: {
      radioClickHandler() {
        this.$emit('radioChange', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val) {
        this.$emit('numChange', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品的最新数量
          goods_count: +val  //防止val类型为String，可以“+val”或者“val+0”
        })
        
        this.$store.commit('updateGoodsCount',this.goods)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 5px;

    .goods-item-left {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }


    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
