import Vue from 'vue'
import App from './App'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 导入Store的实例对象
import store from './store/store.js'
Vue.config.productionTip = false
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用

App.mpType = 'app'
uni.$http = $http
// 封装的展示消息提示的方法
uni.$showMsg = function (title = '数据加载失败！', duration = 1500) {
uni.showToast({
title,
duration,
icon: 'none',
})
}
$http.baseUrl = 'https://www.uinav.com'
// 请求拦截器：请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title:"数据加载中..."
  })
}
// 响应拦截器 请求完成之后做一些事情
$http.afterRequest = function () {
  uni.hideLoading()
}
const app = new Vue({
	...App,
  // 2. 将store挂载到app实例上
  store
})
app.$mount()
