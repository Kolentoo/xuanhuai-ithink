<template>
  <div class="login" v-loading="loading">
    <top :logined="logined" :userName="userName" :avatar="avatar" :aid="aid" :sid="sid"></top>
    <div class="content">
      <div class="tab-box">
        <ul class="tab-head clearfix">
          <!-- <li :class="['tab-list pointer fl',{' tab-on':current==1}]" @click="tab(1)">密码登录</li> -->
          <li :class="['tab-list pointer',{' tab-on':current==2}]" @click="tab(2)">手机登录</li>
        </ul>
        <div class="tab-body">
          <div class="item" v-if="current==1">
            <div class="input-box">
              <input type="text" placeholder="请输入账号">
            </div>
            <div class="input-box">
              <input type="password" placeholder="请输入密码">
            </div>
          </div>
          <div class="item" v-if="current==2">
            <div class="input-box get-code">
              <input type="text" maxlength="11" placeholder="请输入手机号" v-model="phone">
              <p class="p1">
                <i v-if="clickable" @click="checkPhone" class="pointer">获取验证码</i>
                <i v-if="!clickable">{{codeTime}}</i>
              </p>
            </div>
            <div class="input-box">
              <input type="text" v-model="code" maxlength="4" @keyup.enter="login" placeholder="请输入验证码">
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <p class="p1">未注册手机号，完成验证即可注册登录</p>
        <div class="btn pointer" @click="login">登录</div>
        <div class="other clearfix">
          <p class="p1 fl hide">忘记密码</p>
          <p class="p1 fr hide">立即注册</p>
        </div>
      </div>
    </div>
    <img class="vm rocket" src="../assets/images/rocket.png" alt="">
  </div>
</template>

<script>
  import all from '../../config/dev.env.js'
  import top from '../components/top'

  export default {
    data() {
      return {
        current: 2,
        codeTime: 59,
        clickable: true,

        phone: '',
        code: '',
        phoneCheck: false,
        logined: false,
        loading:false,

        studentId: '',
        userName: '',
        avatar: '',
        aid: '',
        sid: ''
      }
    },
    created() {
      document.title = '宣怀教育'
    },
    methods: {
      tab(item) {
        this.current = item
      },
      login() {
        if (this.current == 1) {
          //账号登录 暂时没有
        } else {
          if (this.phone) {
            if (this.phone.length === 11 && this.phone.charAt(0) === '1') {
              if (this.code) {
                if (this.code.length === 4) {
                  this.phoneLogin()
                } else {
                  this.$message.error('验证码错误');
                }
              } else {
                this.$message.error('请输入验证码');
              }
            } else {

              this.$message.error('手机号格式错误');
            }
          } else {
            this.$message.error('请输入手机号');
          }
        }
      },
      getCode() {
        console.log('phoneLogin -- 0')
        //获取验证码
        // this.$axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded' ;
        this.$axios({
          method: 'post',
          url: all.test + 'api/v1/meta/sms',
          data: {
            mobile: this.phone,
            type: '1'
          },
          transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {
          //  console.log(res.data) ;
          if (res.data.code === '0') {

            this.clickable = false
            let self = this
            setInterval(
                function () {
                  if (self.codeTime > 1) {
                    self.codeTime--
                  } else {
                    self.clickable = true
                  }
                },
                1000
            )
            this.$message({
              message: res.data.message,
              type: 'success'
            });

          } else {
            this.$message.error(res.data.message);
          }

        })
      },
      checkPhone() {
        if (this.phone) {
          if (this.phone.length === 11 && this.phone.charAt(0) === '1') {
            this.getCode()
          } else {
            this.$message.error('手机号格式错误');
          }
        } else {
          this.$message.error('请输入手机号');
        }
      },
      phoneLogin() {
        console.log('phoneLogin -- 2')
        // this.$axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded' ;
        this.loading = true;
        this.$axios({
          method: 'post',
          url: all.test + 'api/v1/account/login_sms',
          data: {
            mobile: this.phone,
            code: this.code
          },
          transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(res => {
          // console.log(res.data)
          this.loading = false
          if (res.data.code === '0') {
            localStorage.setItem('token', res.data.data.access_token);
            this.$axios.defaults.headers.common['access-token'] = res.data.data.access_token

            this.userName = res.data.data.student_name
            this.avatar = res.data.data.avatar
            this.aid = res.data.data.account_id
            this.sid = res.data.data.student_id
            localStorage.setItem('sname', this.userName);
            localStorage.setItem('avatar', this.avatar);
            localStorage.setItem('aid', this.aid);
            localStorage.setItem('sid', this.sid);

            this.$message({
              message: res.data.message,
              type: 'success'
            })
            this.$router.push(`/mylesson/${res.data.data.account_id}/${res.data.data.student_id}`)
          } else {
            this.$message.error(res.data.message);
          }

        })

      }
    },
    components: {
      top
    }
  }
</script>

<style scoped>
  body, html {
    overflow: hidden;
    height: 100%;
    width: 100vw;
  }

  .login {
    background: url('../assets/images/bj1.jpg') no-repeat center center;
    background-size: cover;
    height: 100vh;
    position: relative;
  }

  .login .rocket {
    position: absolute;
    z-index: 100;
    left: 10%;
    bottom: 10%;
  }

  .content {
    width: 365px;
    background: #fff;
    box-shadow: 0px 3px 40px rgba(9, 22, 62, 0.46);
    border-radius: 4px;
    margin: 8% auto 0;
    padding-bottom: 35px;
  }

  .tab-box {
    padding: 35px 25px;
  }

  .tab-list {
    font-size: 24px;
    color: #B4B4B4;
    transition: all ease .3s;
    padding: 7px 10px;
    border-bottom: 1px solid #fff;
    width: 100px;
    margin: 0 auto;
  }

  .tab-on {
    color: #9C1D22;
    border-color: #fff;
  }

  .tab-body {
    margin-top: 40px;
  }

  .input-box {
    border-bottom: 1px solid rgba(152, 152, 152, 1);
    margin-bottom: 12px;
  }

  input {
    border: none;
    font-size: 16px;
    padding: 13px 0;
  }

  .get-code {
    position: relative;
  }

  .get-code .p1 {
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 16px;
    color: #9C1D22;
  }

  .btn-box {
    margin-top: 25px;
    padding: 0 25px;
  }

  .btn-box .p1 {
    color: #B2B2B2;
    margin-bottom: 5px;
  }

  .btn-box .btn {
    background: #8E2A2A;
    color: #fff;
    font-size: 24px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    border-radius: 4px;
    margin-bottom: 5px;
  }


</style>