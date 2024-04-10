import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters(['total'])
  },
  watch:{
    total(){
      this.setTabBar()
    }
  },
  onShow() {
    this.setTabBar()
  },
  methods: {
    setTabBar() {
      uni.setTabBarBadge({
        index: 2, // tabBar的哪一项，从左边算起，索引从0开始
        text: this.total + '' //string显示的文本，但必须是string，所以我们可以加上''，强制转换为字符串类型
      })
    }
  }
}
