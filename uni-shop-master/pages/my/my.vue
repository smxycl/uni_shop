<template>
  <view>
    <my-login v-if="!token"></my-login>
    <my-userInfo v-else></my-userInfo>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'

  export default {
    mixins: [badgeMix],
    data() {
      return {

      };
    },
    computed:{
      ...mapState({
        token:state=>state.user.token
      })
    }
  }
</script>

<style lang="scss">

</style>
