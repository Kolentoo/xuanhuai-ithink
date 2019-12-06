<template>
  <div class="login" v-loading="loading">
    <div class="form-box">
      <div class="form">
        <div class="logo">
          <img class="vm g10" src="../../assets/images/logo1.png" alt="">
        </div>
        <div class="input-box">
          <input type="text" :placeholder="phoneholder" maxlength="11" v-model="phone">

        </div>
        <div class="input-box">
          <input type="text" :placeholder="codeholder" maxlength="4" v-model='code' @keyup.enter="login">
          <div class="code-box">
            <p class="get-code" @click="getCode" v-if="!send">获取验证码</p>
            <p class="second" v-if="send">{{second}} s</p>
          </div>
        </div>
        <p class="btn pointer" @click="login">登录</p>
      </div>
    <img class="vm g10" src="../../assets/images/loginbottom.png" alt="">
  </div>

  </div>

</template>

<script>
import all from '../../../config/dev.env.js'
export default {
  data(){
    return{
      phoneholder:'请输入手机号',
      codeholder:'请输入验证码',
      phone:'',
      code:'',
      second:59,
      send:false,
      check1:false,
      loading:false,
    }
  },
  created(){

  },
  methods:{
    getCode(){
      this.phoneCheck()
    },
    phoneCheck(){
      if(this.phone){
        if(this.phone.length=='11'&&this.phone.charAt(0)=='1'){

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

          if (res.data.code === '0') {
            let self = this
            this.send=true
            var control = setInterval(()=>{
              self.second--
              if(self.second>0){
                
              }else{
                self.send=false

                clearInterval(control)
              }
            },1000)

          } else {
            this.$message.error(res.data.message);
          }

        })
          
        }else{
          this.$message.error('手机号格式错误');
        }
      }else{
        this.$message.error('请输入手机号');
      }
    },
    login(){
      if(this.phone){
        if(this.phone.length=='11'&&this.phone.charAt(0)=='1'){
          if(this.code){
            if(this.code.length=='4'){
              this.submitData()
            }else{
              this.$message.error('验证码错误');
            }
          }else{
            this.$message.error('请输入验证码');
          }
          
        }else{
          this.$message.error('手机号格式错误');
        }
      }else{
        this.$message.error('请输入手机号');
      }
    },
    submitData(){
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
            localStorage.setItem('token', res.data.data['access-token']);
            this.$axios.defaults.headers.common['access-token'] = res.data.data['access-token']

            this.userName = res.data.data.student_name
            this.avatar = res.data.data.avatar
            this.aid = res.data.data.account_id
            this.sid = res.data.data.student_id
            localStorage.setItem('sname', this.userName);
            localStorage.setItem('avatar', this.avatar);
            localStorage.setItem('aid', this.aid);
            localStorage.setItem('sid', this.sid);

            // this.$router.push(`/lesson/${res.data.data.account_id}/${res.data.data.student_id}`)
            this.$router.push(`/lesson/${res.data.data.account_id}/8028`)
          } else {
            this.$message.error(res.data.message);
          }

        })
      
    }
  }

}
</script>

<style scoped>
  .login {background: url('../../assets/images/bj1.png') no-repeat center center;height: 100vh;background-size:cover;
  display:flex;justify-content: center;align-items: center;}
  .form-box {width: 410px;}
  .form {width: 330px;background:rgba(255,255,255,1);box-shadow:0px 3px 40px rgba(165,106,106,0.5);border-radius:12px 12px 0px 0px;
  padding:40px 40px 80px;}
  .logo {width: 180px;margin: 0 auto;}
  .input-box {margin-top: 20px;position: relative;}
  input {width: 100%;height: 50px;line-height: 50px;text-indent: 10px;border:none;border-bottom:1px solid #E6E6E6;transition:all ease .3s;}
  .code-box {position: absolute;width: 70px;right: 0;bottom: 0;text-align: center;}
  .code-box .get-code {color:#DE713C;height: 50px;line-height: 50px;cursor: pointer;}
  .code-box .second {height: 50px;line-height: 50px;}
  .btn {height:48px;background:#AF1A18;box-shadow:0px 4px 10px rgba(175,26,24,0.23);border-radius:26px;line-height: 48px;
  font-size:16px;text-align: center;color:#fff;margin-top: 60px;}

  .wrong input{border-color:rgba(230,51,49,1);}
  .wrong input:-ms-input-placeholder{color:#AF1A18;}
  .wrong input::-webkit-input-placeholder{color:#AF1A18;}
</style>