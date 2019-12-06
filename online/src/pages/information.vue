<template>
  <div class="information" v-loading="loading">
    <top :logined="logined" :userName="userName" :avatar="avatar" :aid="aid" :sid="sid"></top>

    <div class="tab-box">
      <ul class="tab-con">
        <li class="tab-list tab-on">个人信息</li>
        <li class="tab-list hide">财务安全</li>
        <li class="tab-list hide">账号绑定</li>
      </ul>
    </div>

    <div class="form-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="头像" prop="avatar" required>
          <div class="avatar-box">
            <el-upload
                :action="actionUrl"
                list-type="picture-card"
                :on-change="changeAvatar"
                :on-preview="handlePictureCardPreview"
                :limit="1"
                :auto-upload="false"
                :multiple="false"
                :file-list="fileList"
                :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
          <div class="notice">
            <p class="p1">1、图片尺寸为300*300px</p>
            <p class="p1">2、图片大小不超过3MB</p>
            <p class="p1">3、图片格式支持JPG/PNG</p>
          </div>
        </el-form-item>
        <el-form-item label="用户名" prop="userName" required>
          <el-input v-model="ruleForm.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="ruleForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="英文姓名" prop="englishName">
          <el-input v-model="ruleForm.englishName"></el-input>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-col :span="24">
            <el-form-item prop="date1">
              <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex" required>
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在地" prop="placeValue1" class="city" required>
          <div class="city-con">
            <el-col :span="7">
              <el-select v-model="ruleForm.placeValue1" placeholder="请选择省" @change="choosePlace1">
                <el-option
                    v-for="item in placeGroup1"
                    :key="item.region_id"
                    :label="item.region_name"
                    :value="item.region_id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-select v-model="ruleForm.placeValue2" placeholder="请选择市" @change="choosePlace2">
                <el-option
                    v-for="item in placeGroup2"
                    :key="item.region_id"
                    :label="item.region_name"
                    :value="item.region_id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="7">
              <el-select v-model="ruleForm.placeValue3" placeholder="请选择区">
                <el-option
                    v-for="item in placeGroup3"
                    :key="item.region_id"
                    :label="item.region_name"
                    :value="item.region_id">
                </el-option>
              </el-select>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item label="所在年级" prop="grade" class="grade">
          <el-col :span="24">
            <el-select v-model="ruleForm.grade" placeholder="请选择所在年级">
              <el-option
                  v-for="item in options"
                  :key="item.param_id"
                  :label="item.param_name"
                  :value="item.param_id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="ruleForm.wechat"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone" required>
          <el-input v-model="ruleForm.phone" disabled></el-input>
        </el-form-item>


        <el-form-item>
          <p class="btn" @click="save">保存</p>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
  import all from '../../config/dev.env.js'
  import top from '../components/top'

  export default {
    data() {
      return {
        logined: true,
        loading: false,
        userName: localStorage.getItem('sname'),
        avatar: localStorage.getItem('avatar'),
        aid: localStorage.getItem('aid'),
        sid: localStorage.getItem('sid'),

        options: [],
        imageUrl: '',

        //上传
        actionUrl: all.test + 'api/v1/avatar/binary',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],

        ruleForm: {
          avatar: '',
          userName: '',
          realName: '',
          englishName: '',
          grade: '',
          brithday: '',
          sex: '1',
          qq: '',
          wechat: '',
          phone: '',

          placeValue1: '',
          placeValeu2: '',
          placeValue3: '',
        },
        check: false,
        placeGroup1: [],
        placeGroup2: [],
        placeGroup3: [],
        rules: {
          avatar: [
            {required: true, message: '请上传头像', trigger: 'blur'},
          ],
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          brithday: [
            {required: true, message: '请输入选择生日', trigger: 'change'},
          ],
          placeValue1: [
            {required: true, message: '请选择省', trigger: 'change'}
          ],
          placeValeu2: [
            {required: true, message: '请选择市', trigger: 'change'}
          ],
          placeValue3: [
            {required: true, message: '请选择区', trigger: 'change'}
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
        }
      }
    },
    created() {
      this.getInfo()
      this.getGrade()
      this.getPlace1()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check = true
          } else {
            this.check = false
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        // this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // return isJPG && isLt2M;
      },
      getInfo() {
        //获取个人信息
        this.$axios({
          method: 'get',
          url: all.test + 'api/v1/account/info',
          params: {
            student_id: localStorage.getItem('sid'),
            account_id: localStorage.getItem('aid')
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.code === '0') {
            this.ruleForm.avatar = res.data.data.account.avatar
            this.ruleForm.imageUrl = res.data.data.account.avatar
            this.ruleForm.userName = res.data.data.account.account_name
            this.ruleForm.realName = res.data.data.student.student_name
            this.ruleForm.englishName = res.data.data.student.student_name_en
            this.ruleForm.grade = res.data.data.customer.grade
            this.ruleForm.brithday = res.data.data.customer.birthday
            this.ruleForm.sex = res.data.data.customer.sex.toString()
            this.ruleForm.qq = res.data.data.customer_family.qq
            this.ruleForm.wechat = res.data.data.customer_family.other_contact
            this.ruleForm.phone = res.data.data.account.mobile
            this.ruleForm.placeValue1 = res.data.data.customer_family.province_id.toString()
            this.ruleForm.placeValeu2 = res.data.data.customer_family.city_id.toString()
            this.ruleForm.placeValue3 = res.data.data.customer_family.area_id.toString()
            if (res.data.data.account.avatar) {
              this.fileList = [{"name": '', "url": res.data.data.account.avatar}]
            }

          }
        });
      },
      save() {
        this.submitForm('ruleForm')
        if (this.check === false) {

        } else {
          this.submitInfo()
        }
      },
      submitInfo() {
        this.$axios({
          method: 'post',
          url: all.test + 'api/v1/account/edit',
          data: {
            account_id: localStorage.getItem('aid'),
            student_id: localStorage.getItem('sid'),
            real_name: this.ruleForm.realName,
            real_name_en: this.ruleForm.englishName,
            grade: this.ruleForm.grade,
            avatar: this.ruleForm.avatar,
            birthday: this.ruleForm.birthday,
            sex: this.ruleForm.sex,
            weixin: this.ruleForm.wechat,
            qq: this.ruleForm.qq,
            province_id: this.ruleForm.placeValue1,
            city_id: this.ruleForm.placeValue2,
            area_id: this.ruleForm.placeValue3
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
          console.log(res.data)
          if (res.data.code === '0') {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
      },
      changeAvatar(file, fileList) {
        this.uploadPics(file.raw)
      },
      getGrade() {
        this.$axios({
          method: 'get',
          url: all.test + 'api/v1/meta/grade',
          params: {},
        }).then(res => {
          this.options = res.data
        });
      },
      getPlace1() {
        this.$axios({
          method: 'get',
          url: all.test + 'api/v1/meta/regions',
          params: {
            parent_id: 0
          },
        }).then(res => {
          if (res.data.code === '0') {
            this.placeGroup1 = res.data.data
          }
        });
      },
      choosePlace1() {
        this.$axios({
          method: 'get',
          url: all.test + 'api/v1/meta/regions',
          params: {
            parent_id: this.ruleForm.placeValue1
          },
        }).then(res => {
          if (res.data.code === '0') {
            this.placeGroup2 = res.data.data
          }
        });
      },
      choosePlace2() {
        this.$axios({
          method: 'get',
          url: all.test + 'api/v1/meta/regions',
          params: {
            parent_id: this.ruleForm.placeValue2
          },
        }).then(res => {
          if (res.data.code === '0') {
            this.placeGroup3 = res.data.data
          }
        });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadPics(fileObj) {
        this.$axios({
          method: 'post',
          url: this.actionUrl,
          timeout: 20000,
          data: fileObj,
          onUploadProgress: progressEvent => {
            const complete = (progressEvent.loaded / progressEvent.total).toFixed(2) * 100;
          },
        }).then(res => {
          if (res.data.code === '0') {
            this.$message({
              message: res.data.message,
              type: 'success'
            });
            this.ruleForm.avatar = res.data.data.url
            // console.log(res.data)

          } else {
            this.$message.error(res.data.message);
          }
        });
      },
    },
    components: {
      top
    }
  }
</script>

<style scoped>
  .tab-box {
    height: 70px;
    background: #F3F5F8;
  }

  .tab-con {
    width: 80%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .tab-list {
    color: #B5B5B5;
    font-size: 18px;
    transition: all ease .3s;
    cursor: pointer;
    border-bottom: 2px solid #F3F5F8;
    margin: 23px 50px 0 0;
    padding: 0 10px 20px;
  }

  .tab-list:hover {
    border-color: #707070;
    color: #707070;
  }

  .tab-on {
    border-color: #707070;
    color: #707070;
  }

  .form-box {
    width: 520px;
    margin: 50px auto 0;
    padding-bottom: 50px;
  }

  .city .el-select {
    width: 100%;
  }

  .city-con {
    display: flex;
    justify-content: space-between;
  }

  .grade .el-select {
    width: 100%;
  }

  .avatar-box {
    display: flex;
    justify-content: space-between;
    width: 150px;
    height: 150px;
    overflow: hidden;
  }

  .notice {
    width: 200px;
    margin-top: 25px;
  }

  .notice .p1 {
    line-height: 2;
    font-size: 16px;
    color: #B2B2B2;
  }

  .btn {
    width: 100%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: #9C1D22;
    margin-top: 50px;
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    border-radius: 8px;
  }


</style>