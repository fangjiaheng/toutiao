<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to='/'>标签</van-tabbar-item>
      <van-tabbar-item icon="search" to='qa'>标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to='/video'>标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to='/mine'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {}
}
</script>

<style>

</style>
