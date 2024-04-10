<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          query: '', // 查询关键字
          cid: '', // 分类ID
          pagenum: '1', // 页数索引
          pagesize: '10' // 每页的长度
        },
        goodsList: [], // 商品列表
        total: "0", // 总数量，用来实现分页
        isloading: "false " // 是否正在请求数据
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表的数据
      async getGoodsList(cb) {
        //节流阀:当为true时,为发送请求
        this.isloading = true
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 节流阀:请求完毕
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        // this.goodsList = res.message.goods 
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(item){
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
    },
    // 滚动页面到距离底部50px时，就会触发onReachBottom事件
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
        return uni.$showMsg('数据加载完毕！')
      // 判断是否正在请求其它数据，如果是，则不发起额外的请求
      if (this.isloading) return

      // 让页码值自增 +1
      this.queryObj.pagenum += 1
      // 重新获取列表数据
      this.getGoodsList()
    },
    // 下拉刷新
    onPullDownRefresh() {
      // 重置重要数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      // 重新发送请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    
  }
</script>

<style lang="scss">
</style>
