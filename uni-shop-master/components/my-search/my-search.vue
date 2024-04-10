<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="boxHandler">
    <!-- 使用view组件模拟input输入框的样式 -->
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>		
	</view>
</template>

<script>
	export default {
    props:{
      // 背景颜色
      bgcolor:{
        type:String,
        default:'#c00000'
      },
      // 圆角尺寸
      radius:{
        type:String,
        // 单位：px
        default:'15'
      }
    },
		data() {
			return {
				
			};
		},
    methods:{
      boxHandler(){
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container {
  height: 50px;
  // background-color: #c00000;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box {
    background-color: #FFFFFF;
    height: 36px;
    width: 100%;
    // border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
