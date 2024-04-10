<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <!-- uniSearchBar 的 value 改变时触发事件，返回参数为uniSearchBar的value,返回参数e=value -->
      <!-- cancelButton：是否显示取消按钮 -->
      <uni-search-bar @input="input" cancelButton @confirm="gotoList"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length!==0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16" @click="cleanHistory"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click='cleanHistory'></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 延时器的TimeOut
        timer: '',
        // 搜索框的关键词
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 搜索关键词的历史记录
        historyList: ['a', 's', 'dfg']
      };
    },
    computed: {
      historys() {
        return [...this.historyList].reverse()
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        // 注意：如果用unishift，每次把数据添加到最前面，而:key绑定的是索引，这样列表渲染有问题，每次虚拟Dom解析后有问题
        // 从vue的重新渲染机制上看，循环出来的序号会被unshif顶掉，有可能会出现渲染错误,不推荐但可以用

      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // @input:uniSearchBar 的 value 改变时触发事件，返回参数为uniSearchBar的value,
      input(e) {
        // 清除timer对应的延时器
        clearTimeout(this.timer)
        // 如果500毫秒内，没有触发新的事件（搜索关键词），则为搜索关键字赋值
        this.timer = setTimeout(() => {
          this.kw = e.value
          // 搜索关键词列表
          this.getSearchList()
        }, 500)
      },
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {
          data: res
        } = await
        uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        // 1. 查询到搜索建议之后，调用 saveSearchHistory() 方法保存搜索关键词
        this.saveSearchHistory()
      },
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      // 2. 将搜索关键词存入historyList中
      // 这里用set不是很好直接some域者find过滤;在用shift在首项添加就行
      saveSearchHistory() {
        // this.historyList.push(this.kw)
        // 1. 将Array数组转换为Set对象
        const set = new Set(this.historyList)
        // 2. 调用Set对象的delete方法，移除相应的元素
        set.delete(this.kw)
        // 3. 调用Set对象的add方法，向Set中添加元素
        set.add(this.kw)
        // 将Set对象转换为Array数组
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清空搜索历史记录
      cleanHistory() {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      },
      // 点击跳转到商品列表页面
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      },
      gotoList(e){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+e.value
        })
      }
    }
  }
</script>

<style lang="scss">
  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      display: flex;
      padding: 13px 0;
      font-size: 12px;
      background-color: #efefef;
      align-items: center;
      justify-content: space-around;

      .goods-name {
        // 文字不换行
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用...代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  // 搜索历史
  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin: 5px 0 0 5px;
      }
    }
  }
</style>
