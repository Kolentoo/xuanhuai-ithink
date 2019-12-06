<template>
    <div class="mylesson" v-loading="loading">
        <top :logined="logined" :userName="userName" :avatar="avatar" :aid="aid" :sid="sid"></top>
        <div class="swiper-box" v-if="swiperSlides!==null">
            <div class="swiper-con">
            <swiper :options="swiperOption">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <div class="slide">
                    <div class="slide-con">
                        <div class="slide-info">
                            <p class="name">{{slide.course_name}}</p>
                            <p class="desc">{{slide.class_name}}</p>
                            <!-- <p class="time">{{slide.begin_day}} {{slide.begin_time}}~{{slide.end_time}}</p> -->
                            <img class="robot vm" src="../assets/images/lessonrobot.png" alt="">
                        </div>
                        <div class="btn pointer">
                            <span class="s1" @click="goLesson">进入课程</span>
                            <img class="miniarrow" src="../assets/images/miniarrow.png" alt="">
                        </div>
                    </div>
                </div>
            </swiper-slide>

            
            </swiper>
            </div>
            <div class="swiper-pagination hide" slot="pagination"></div>
            <div class="swiper-button-prev prev swiper-btn" slot="button-prev"></div>
            <div class="swiper-button-next next swiper-btn" slot="button-next"></div>
        </div>

        <p class="result tc" v-if="swiperSlides===null">暂无课程</p>
    </div>
</template>

<script>
import all from '../../config/dev.env.js'
import top from '../components/top'
export default {
    data(){
        return{
            loading:false,
            logined:true,
            userName:localStorage.getItem('sname'),
            avatar:localStorage.getItem('avatar'),
            aid:localStorage.getItem('aid'),
            sid:localStorage.getItem('sid'),

            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 0,
                freeMode: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            },
            swiperSlides: [
                {course_name:'在线少儿编程',desc:'让孩子在玩乐中学习编程思维让孩子在玩乐中学习编程思维让孩子在玩乐中学习编程思维',time:'每周五18：00~20：00 11月13日~12月13日'},
            ]
        }
    },
    created(){
        this.getLesson()
    },
    methods:{
        getLesson(){
            this.loading=true
            this.$axios({
                method: 'get',
                url: all.test+'api/v1/student/classroom',
                params: {
                    student_id:this.$route.params.student_id
                }
            }).then(res=>{
                console.log(res.data)
                this.loading=false
                if(res.data.data===null){
                    this.swiperSlides=res.data.data
                    this.$message.error('暂无数据');
                }else if(res.data.code==='0'){
                    this.swiperSlides=res.data.data
                }else{
                    this.$message.error(res.data.message);
                }

            })
        },
        goLesson(){
            this.$router.push(`/lessonitem/${this.$route.params.student_id}`);
        }
    },
    components:{
        top
    }
}
</script>

<style scoped>
.mylesson {background: url('../assets/images/bj1.jpg') no-repeat center center;background-size: cover;height: 100vh;
    position: relative;}

.swiper-container {padding:50px 0;}
.swiper-box {position: relative;}
.swiper-con {width: 100%;margin: 7% auto 0;}
.slide {background:#fff;box-shadow:0px 3px 40px rgba(9,22,62,0.46);border-radius:8px;margin:0 45px;
transition:all ease .3s;transform:scale(1,1);}
.slide:hover {transform:scale(1.05,1.05);}
.slide-con {padding: 10px;color:#fff;}
.slide-info {background: #238DC1;position: relative;padding-bottom: 20px;}
.slide-info .name {font-size:28px;font-weight: bold;padding:30px 0 0 20px;width: 56%;height: 105px;
overflow: hidden;}
.slide-info .desc {font-size:20px;padding:40px 0 0 20px;height: 75px;overflow: hidden;width: 62%;}
.slide-info .time {font-size: 16px;padding:20px 0 0 20px;width: 90%;white-space: nowrap;overflow: hidden;
text-overflow: ellipsis;}
.slide-info .robot {position: absolute;width: 136px;right: 20px;bottom: 40px;z-index:10;}
.slide .btn {background: #8E2A2A;width: 100%;height: 68px;line-height: 68px;display:flex;
justify-content: center;align-items: center;margin: 25px 0 10px 0;}
.slide .btn .s1 {color:#fff;font-size: 20px;}
.slide .btn .miniarrow {width: 6px;margin-left: 20px;}
.swiper-btn {position: absolute;top: 50%;z-index:300;margin-top: -39px;}
.result {font-size: 40px;color:#fff;margin-top: 25%;}
.prev {background: url('../assets/images/arrow1.png') no-repeat center center;width: 39px;height: 78px;left: 20px;}
.next {background: url('../assets/images/arrow2.png') no-repeat center center;width: 39px;height: 78px;right: 20px;}
</style>