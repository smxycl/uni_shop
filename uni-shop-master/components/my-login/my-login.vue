<template>
  <view class="login-container">
    <uni-icons type="contact-filled" class="login" size="100" color="#AFAFAF"></uni-icons>
    <text class="btn-login" @click="getUserInfo">一键登录</text>
    <view class="tips-text">登录后尽享更多权益</view>

  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods: {
      // 获取微信用户的基本信息
      getUserInfo() {
        uni.getUserProfile({
          desc: '获取用户信息',
          // success:(e)=>{
          //   console.log(e)
          // }
          success: (res) => {
            if (res.errMsg === "getUserProfile:ok") {
              this.$store.commit('updateUserInfo', res.userInfo)
              this.getToken(res)
            }
          },
          fail: (err) => {
            return uni.$showMsg('你取消了授权')
          }
        })
      },
      // 调用登录接口，换取永久的 token
      async getToken(info) {
        // 调用微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log(res,err)
        // 判断是否 wx.login() 调用失败
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录1失败！')
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        console.log('query',query)
        // 换取 token
        const {data:result} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        console.log(result,'data')
        if (result.meta.status !== 200) return uni.$showMsg('登录2失败！')
        // uni.$showMsg('登录成功')
        // 2. 更新 vuex 中的 token
        this.$store.commit('updateToken',result.message.token)
      }
      // getUserInfo(e) {
      //   // 判断是否获取用户信息成功
      //   if (e.detail.errMsg === 'getUserInfo:fail auth deny') return
      //   uni.$showMsg('您取消了登录授权！')
      //   // 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
      //   console.log(e.detail.userInfo)
      // }
    }
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
