<template>
  <div class="top">
    <div class="top-con clearfix">
      <div class="logo-box fl" @click="goIndex">
        <img class="logo-pic vm g10" src="../assets/images/logo.png" alt="">
      </div>
      <div class="menu-group fl">
        <ul class="menu-con clearfix">
          <li class="menu-list pointer fl" @click="goMenu(1)">我的课程</li>
          <li class="menu-list pointer fl hide" @click="goMenu(2)">我的直播</li>
          <li class="menu-list pointer fl" @click="goMenu(3)">软件下载</li>
        </ul>
      </div>
      <div class="user-box fr clearfix" v-if="logined" @click="myInfo">
        <div class="user fl">
          <img class="user-pic vm g10 " :src="avatar?avatar:pic" alt="">
        </div>
        <p class="user-name fl">{{userName}}</p>
        <p class="loginout fl pointer" @click="loginout">退出</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['logined', 'userName', 'avatar'],
    data() {
      return {
        pic: require('../assets/images/user.png'),
      }
    },
    created() {

    },
    methods: {
      goMenu(item) {
        if (item == 1) {
          let sid = localStorage.getItem('sid');
          let aid = localStorage.getItem('aid')
          this.$router.push(`/mylesson/${aid}/${sid}`)
        } else if (item == 2) {
          this.$router.push('/lessonitem')
        } else {
          this.$router.push('/download')
        }
      },
      myInfo() {
        this.$router.push(`/information/${localStorage.getItem('sid')}`)
      },
      goIndex() {
        this.$router.push('/')
      },
      loginout() {
        localStorage.clear()
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .top {
    height: 60px;
    background: #8E2A2A;
  }

  .top-con {
    margin: 0 10%;
  }

  .logo-box {
    width: 140px;
    margin-top: 10px;
    cursor: pointer;
  }

  .menu-group {
    margin-left: 12%;
    width: 50%;
  }

  .menu-group .menu-list {
    color: #fff;
    font-size: 16px;
    margin: 10px 8% 0;
    transition: all ease .3s;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0)
  }

  .menu-group .menu-list:hover {
    border-bottom: 1px solid #fff;
  }

  .user-box {
    cursor: pointer;
  }

  .user-box .user {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 5px;
  }

  .user-box .user img {
    height: 100%;
  }

  .user-box .user-name {
    line-height: 60px;
    font-size: 16px;
    color: #fff;
    margin-left: 10px;
  }

  .loginout {
    margin-left: 20px;
    font-size: 16px;
    color: #fff;
    line-height: 60px;
  }
</style>