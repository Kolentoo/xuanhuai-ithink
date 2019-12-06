<template>
  <div class="top">
    <div class="top-con clearfix">
      <div class="logo fl">
        <img class="vm g10" src="../../assets/images/logo2.png" alt="">
      </div>
      <ul class="menu-con fl">
        <li class="menu-list">我的课程</li>
      </ul>

      <div class="login-out fr" @click="loginOut">退出</div>
      <div class="information fr">
        <div class="avatar">
          <div class="chart">
            <img class="g10 vm" :src="user.avatar" alt="">
          </div>
          <p class="name">{{user.username}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user:{
        avatar:localStorage.getItem('avatar')?localStorage.getItem('avatar'):require('../../assets/images/avatar.png'),
        username:localStorage.getItem('sname')?localStorage.getItem('sname'):'Kolento',
      }
    }
  },
  methods:{
    loginOut(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .top {height: 60px;background: #F3C135;position: fixed;width: 100%;left: 0;top: 0;z-index:600;}
  .top-con {padding:0 150px;}
  .logo {width: 80px;}
  .avatar {display:flex;align-items: center;}
  .menu-con {margin-left: 150px;}
  .menu-list {cursor: pointer;font-weight: bold;line-height: 60px;color:#fff;}
  .avatar .chart {width: 54px;height: 54px;overflow: hidden;border-radius:50%;}
  .avatar .name {font-size:14px;font-weight: bold;color:#fff;margin-left: 15px;font-weight: bold;line-height: 60px;}
  .login-out {cursor: pointer;font-size:14px;font-weight: bold;line-height: 60px;color:#fff;margin-left: 50px;}
</style>