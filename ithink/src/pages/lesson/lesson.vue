<template>
  <div class="lesson" v-loading="loading">
    <div class="info-box">
      <div class="student">
        <div class="avatar">
          <img class="g10 vm" :src="avatar" alt="">
        </div>
        <div class="name">{{username}}</div>
      </div>
    </div>

    <div class="content">
      <swiper :options="swiperOption" ref="mySwiper" v-if="swiperSlides!==null&&swiperSlides.length>0">
          <swiper-slide v-for="(item,idx) in swiperSlides" :key="idx" class="slide">
            <div class="item" @click="goLesson(item.student_id,item.course_id,item.class_id,item.course_name)">
              <div class="lesson-info" :style="{color:item.color}">
                <p class="lesson-name">{{item.class_name}}</p>
                <p class="lesson-desc">{{item.course_name}}</p>
              </div>
              <img class="g10 vm" v-if="idx==0" src="../../assets/images/lesson1.png" alt="">
              <img class="g10 vm" v-if="idx==1" src="../../assets/images/lesson2.png" alt="">
              <img class="g10 vm" v-if="idx==2" src="../../assets/images/lesson3.png" alt="">
              <!-- <img class="g10 vm" :src="item.url" alt=""> -->
            </div>
          </swiper-slide>
      </swiper>
      <!-- Optional controls -->
      <div class="swiper-left pointer swiper-btn">
        <img class="g10 vm" src="../../assets/images/left.png" alt="">
      </div>
      <div class="swiper-right pointer swiper-btn">
          <img class="g10 vm" src="../../assets/images/right.png" alt="">
      </div>
      <div class="swiper-pagination hide"  slot="pagination"></div>
      <div class="swiper-scrollbar hide"   slot="scrollbar"></div>

      <p class="no-lesson tc b" v-if="swiperSlides==null||swiperSlides.length==0">暂无课程</p>
    </div>

    
</div>
</template>
  
<script>
import all from '../../../config/dev.env.js'
export default {
  data(){
    return{
      avatar:localStorage.getItem('avatar')?localStorage.getItem('avatar'):require('../../assets/images/avatar.png'),
      username:localStorage.getItem('sname')?localStorage.getItem('sname'):'Kolento',
      loading:false,
      show:false,

      swiperSlides: [
        // {
        //   url:require('../../assets/images/lesson1.png'),
        //   name:'爱上数学体验课',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#E9A145'
        // },
        // {
        //   url:require('../../assets/images/lesson2.png'),
        //   name:'少儿科学工程课 (双语)',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#FF8580'
        // },
        // {
        //   url:require('../../assets/images/lesson4.png'),
        //   name:'少儿科学工程课 (双语)',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#045189'
        // },
        // {
        //   url:require('../../assets/images/lesson3.png'),
        //   name:'少儿科学工程课 (双语)',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#66554E'
        // },
        // {
        //   url:require('../../assets/images/lesson1.png'),
        //   name:'爱上数学体验课',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#E9A145'
        // },
        // {
        //   url:require('../../assets/images/lesson2.png'),
        //   name:'少儿科学工程课 (双语)',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#FF8580'
        // },
        // {
        //   url:require('../../assets/images/lesson3.png'),
        //   name:'少儿科学工程课 (双语)',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#045189'
        // },
        // {
        //   url:require('../../assets/images/lesson4.png'),
        //   name:'少儿科学工程课 (双语)',
        //   desc:'美国纽约科学院认证课程',
        //   color:'#66554E'
        // },
      
      ],
      swiperOption: {
        slidesPerView: 4.5,
        spaceBetween: 30,
        // slidesPerGroup: 4.5,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-right',
          prevEl: '.swiper-left'
        }
      }
    }
  },
  created(){
    
  },
  mounted(){
    this.getLesson()
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
  methods:{
    getLesson(){
      this.loading=true
      this.$axios({
        method: 'get',
        url: all.test+'api/v1/student/classroom',
        params: {
          student_id:this.$route.params.student_id
          // student_id:1252
        }
      }).then(res=>{
        console.log(res.data.data)
        this.loading=false
        if(res.data.data===null){
            this.$message.error('暂无数据');
        }else if(res.data.code==='0'){
            this.swiperSlides=res.data.data
        }else{
            this.$message.error(res.data.message);
        }


      }).then(res=>{

      })
    },
    goLesson(studentid,courseid,classid,coursename){
      localStorage.setItem('currentLesson',coursename)
      this.$router.push(`/detail/${studentid}/${courseid}/${classid}`);
      
    }
  },

  computed: {
    // swiper() {
    //   return this.$refs.mySwiper.swiper
    // }
  },
}
</script>
  
<style scoped>
  .lesson {background: url('../../assets/images/bj1.png') no-repeat center center;height: 100vh;background-size:cover;}
  .info-box {position: absolute;top: 10px;left: 20px;z-index:10;}
  .student {position: relative;padding-top: 20px;margin-left: 20px;}
  .avatar {width: 78px;height: 78px;border-radius:50%;position: absolute;bottom: -7px;left: -20px;border-radius:50%;overflow: hidden;}
  .name {width:230px;height:60px;background:rgba(116,183,215,1);border:2px solid rgba(255,255,255,0.4);
    border-radius:31px;line-height: 60px;color:#fff;text-align: center;font-size:18px;}
  .slide {width: 20%;box-shadow:0px 3px 20px rgba(144,196,210,0.5);border-radius:24px;background: #fff;position: relative;
  cursor: pointer;}

  .content {display:flex;justify-content: center;align-items: center;height: 100vh;position: relative;}
  .swiper-container {width: 90%;padding:0 5%;}
  .lesson-info {position: absolute;width: 92%;top: 30px;left: 4%;}
  .lesson-name {font-size:26px;font-weight:bold;line-height:34px;color:#E9A145;}
  .lesson-desc {font-weight:bold;line-height:36px;font-size:20px;color:#E9A145;}
  .swiper-btn {position: absolute;top: 50%;width: 50px;margin-top: -50px;outline: none;}
  .swiper-left {z-index:500;left: 0;}
  .swiper-right {z-index:500;right: 0;}

  .no-lesson {font-size:28px;color:#aaa;}

  @media screen and (max-width:1500px) {
    .lesson-name {font-size: 22px;}
    .lesson-desc {font-size: 14px;}
  }
</style>