<template>
  <div class="lesson-detail">
    <div class="back pointer" @click="back">
      <img class="vm g10" src="../../assets/images/back.png" alt="">
    </div>
    <h2>{{lessonTitle}}</h2>
    <div class="content">
      <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,idx) in lessonGroup" :key="idx" class="slide">
            <ul class="item-group clearfix">
              <li :class="['item fl',{'end':list.status==0}]" v-for="(list,index) in item" :key="index">
                <div class="teacher">
                  <div class="chart">
                    <img class="vm g10 avatar" :src="list.avatar?list.avatar:defaultAvatar" alt="">
                  </div>
                  <p class="name">{{list.teacher_name}}</p>
                </div>
                <div class="detail">
                  <p class="p1">{{list.course_name}}</p>
                  <p class="p2">{{list.begin_day}} {{list.begin_time}}</p>
                </div>
                <div class="btn-group" @click="goStudy(list.student_id,list.timetable_id)">
                  <p class="p3 pointer go" v-if="list.is_call_roll==0">课程回放</p>
                  <p class="p3 pointer go" v-if="list.is_call_roll=1">进入学习</p>
                </div>
              </li>
            </ul>

          </swiper-slide>
      </swiper>

      <div class="swiper-left pointer swiper-btn">
        <img class="g10 vm" src="../../assets/images/left.png" alt="">
      </div>
      <div class="swiper-right pointer swiper-btn">
          <img class="g10 vm" src="../../assets/images/right.png" alt="">
      </div>
      <div class="swiper-pagination hide"  slot="pagination"></div>
      <div class="swiper-scrollbar hide"   slot="scrollbar"></div>
    </div>
  </div>
</template>

<script>
import all from '../../../config/dev.env.js'
export default {
  data(){
    return{
      lessonTitle:localStorage.getItem('currentLesson'),
      defaultAvatar:require('../../assets/images/avatar.png'),
      island:require('../../assets/images/island.png'),
      lessonGroup:[
        // [
        //   {
        //     avatar:require('../../assets/images/teacher1.png'),
        //     teacher_name:'hello',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:0
        //   },
        //   {
        //     avatar:require('../../assets/images/teacher2.png'),
        //     teacher_name:'hello',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:1
        //   },
        //   {
        //     avatar:require('../../assets/images/teacher3.png'),
        //     teacher_name:'hello',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:1
        //   }
        // ],
        // [
        //   {
        //     avatar:require('../../assets/images/teacher1.png'),
        //     teacher_name:'Kolento',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:0
        //   },
        //   {
        //     avatar:require('../../assets/images/teacher2.png'),
        //     teacher_name:'Kolento',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:1
        //   },
        //   {
        //     avatar:require('../../assets/images/teacher3.png'),
        //     teacher_name:'Kolento',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:1
        //   }
        // ],
        // [
        //   {
        //     avatar:require('../../assets/images/teacher1.png'),
        //     teacher_name:'Kolento',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:0
        //   },
        //   {
        //     avatar:require('../../assets/images/teacher2.png'),
        //     teacher_name:'Kolento',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:1
        //   },
        //   {
        //     avatar:require('../../assets/images/teacher3.png'),
        //     teacher_name:'Kolento',
        //     title:'如何搞定预约课',
        //     time:'4.12 (15：00~16：00)',
        //     status:1
        //   }
        // ]
      
      ],

      swiperOption: {
        slidesPerView: 1.7,
        spaceBetween: 0,
        slidesPerGroup: 4.5,
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
    this.getDetail()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods:{
    back(){
      window.history.back(-1); 
    },
    getDetail(){
      this.loading=true
      this.$axios({
        method: 'get',
        url: all.test+'api/v1/student/courses',
        params: {
          list_group:3,
          student_id:this.$route.params.student_id,
          course_id:this.$route.params.course_id,
          class_id:this.$route.params.class_id,
          type:0,
          month:''
        }
      }).then(res=>{
        console.log(res.data)
        this.loading=false
        if(res.data.data===null){
            this.lessonGroup=res.data.data
            // this.$message.error('暂无数据');
        }else if(res.data.code==='0'){
            this.lessonGroup=res.data.data
            // var self = this
            // this.lessonGroup.map((current,index)=>{
            //     if(index===0){
            //         setInterval(()=>{
            //             self.clock(current)
            //         },1000)
            //     }
            // })
            
            // this.status=1
        }else{
            this.$message.error(res.data.message);
        }

      })
    },
    goStudy(sid,tid){
      this.$router.push(`/live/${sid}/${tid}`)
    }
  }
}
</script>

<style scoped>
  .lesson-detail {background: url('../../assets/images/bj2.png') no-repeat center center;height: 100vh;background-size:cover;}
  .back {width: 70px;position: absolute;top: 20px;left: 20px;z-index:400;}
  h2 {font-size:30px;text-shadow:0px 2px 4px rgba(0,0,0,0.23);text-align: center;font-weight: bold;color:#fff;padding-top: 30px;
  position: absolute;top: 0;left: 0;width: 100%;}

  .content {display:flex;align-items: flex-end;height: 100vh;position: relative;}
  /* .swiper-container {height: 100vh;} */
  .slide {background: url('../../assets/images/island.png') no-repeat center bottom;background-size: 100%;height: 85vh;
  padding-top: 0;margin:0 0 0 -30px;}
  .slide:first-child {margin: 0;}

  .teacher {width: 94px;margin:0 auto;position: relative;top: -30px;}
  .teacher .chart {width: 87px;border:3px solid #fff;border-radius:50%;overflow: hidden;}
  .teacher .name {width:92px;height:27px;background:#fff;border:1px solid rgba(112,112,112,1);border-radius:22px;
  line-height: 29px;font-size:16px;text-align: center;color:#8E2A2A;margin-top: -13px;position: relative;}


  .item-group {padding-top: 30px;}
  .item {background: #DE713C;box-shadow:0px 5px 20px rgba(230,51,49,0.7);width: 22%;border-radius:25px;padding-bottom: 25px;
  margin:0 6% 0 4%;}
  .item:nth-child(2) {margin:40px 6% 0 4%;}
  .item:last-child {margin:15px 0 0 4%;}
  .item .go {color:#DE713C;background: #fff;border-radius:2244px;height: 48px;line-height: 48px;width: 58%;text-align: center;
  font-size: 16px;margin:25px auto 0;font-weight: bold;}
  .detail {text-align: center;}
  .detail .p1 {font-size:18px;color:#fff;margin:0 0 20px 0;}
  .detail .p2 {font-size:14px;color:#fff}

  .end {box-shadow:0px 5px 20px rgba(103,103,103,0.68);background: #F3C135;}
  .end .go {background: #DE713C;border-radius:2244px;color:#fff;}

  .swiper-btn {position: absolute;top: 50%;width: 50px;margin-top: -50px;outline: none;}
  .swiper-left {z-index:500;left: 0;}
  .swiper-right {z-index:500;right: 0;}
</style>