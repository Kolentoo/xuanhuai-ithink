<template>
    <div class="lessonitem">
        <top :logined="logined" :userName="userName" :avatar="avatar" :aid="aid" :sid="sid"></top>
        <div id="div"></div>
        <div class="board">
            <div class="board-box">
                <div class="board-head" @click="chooseMonth">
                    <span class="s1">{{currentMonth}}月</span>
                    <img :class="['arrow vm',{'arrow-on':showMonth}]" src="../assets/images/arrow3.png" alt="">
                </div>
                <div :class="['board-body',{'board-show':showMonth}]">
                    <div class="board-inner">
                        <ul class="board-con">
                            <li @click="choose(item)" class="month-list" v-for="(item,idx) in monthGroup" :key="idx">{{item}}</li>
                        </ul>
                        <img class="vm shape" src="../assets/images/shape.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <ul class="tab-group clearfix">
            <li :class="['tab-list pointer start fl',{'tab-on':status==1}]" @click="tab(1)">未开始</li>
            <li :class="['tab-list pointer end fl',{'tab-on':status==2}]" @click="tab(2)">已结束</li>
        </ul>

        <p class="tips tc">小贴士：鼠标左右拖动可查看全部课程</p>

        <div class="swiper-box" v-if="status===1">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(slide, index) in swiperSlides1" :key="index" v-if="new Date().getTime()<new Date(slide.begin_day+' '+slide.end_time).getTime()">
                    <div class="slide tc pointer" @click="goDetail(slide)">
                        <div class="chart">
                            <!-- 尚未开始，尚未到达开始时间前半小时 -->
                            <img class="robot vm g10" v-if="new Date().getTime()<new Date(slide.begin_day+' '+slide.begin_time).getTime()-1000*60*30" src="../assets/images/readyrobot.png" alt="">
                            
                            <!-- 进入学习，已到达开始前半小时 小于结束时间 -->
                            <img class="robot vm g10" v-if="new Date(slide.begin_day+' '+slide.begin_time).getTime()-1000*60*30<new Date().getTime()&&new Date().getTime()<new Date(slide.begin_day+' '+slide.end_time).getTime()" src="../assets/images/normalrobot.png" alt="">
                  
                            <!-- 尚未开始 -->
                            <img v-if="new Date().getTime()<new Date(slide.begin_day+' '+slide.begin_time).getTime()-1000*60*30" class="txt vm g10" src="../assets/images/txt2.png" alt="">
                            
                            <!-- 进入学习 -->
                            <img v-if="new Date(slide.begin_day+' '+slide.begin_time).getTime()-1000*60*30<new Date().getTime()&&new Date().getTime()<new Date(slide.begin_day+' '+slide.end_time).getTime()" class="txt vm g10" src="../assets/images/txt1.png" alt="">
                            
                            <!-- 倒计时 大于开始时间前半小时，小于开始时间 -->
                            <div class="time" v-if="new Date(slide.begin_day+' '+slide.begin_time).getTime()-1000*60*60<new Date().getTime()&&new Date().getTime()<new Date(slide.begin_day+' '+slide.begin_time).getTime()-1000*60*30">
                                <p class="last-time">剩余 {{slide.timing}} </p>
                            </div>
                        </div>
                        <p class="name">{{slide.course_name}}</p>
                        <p class="start-time">{{slide.begin_day}}({{slide.begin_time}}~{{slide.end_time}})</p>
                    </div>
                </swiper-slide>
            </swiper>

            <p class="result" v-if="swiperSlides1===null">暂无数据</p>
        </div>

        

        
        <div class="swiper-box" v-if="status===2">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(slide, index) in swiperSlides2" :key="index">
                    <div class="slide tc pointer" @click="goDetail(slide)">
                        <div class="chart">
                            <!-- 已结束，查看回放，当前时间大于结束时间    -->
                            <img class="robot vm g10" v-if="new Date().getTime()>new Date(slide.begin_day+' '+slide.end_time).getTime()" src="../assets/images/normalrobot.png" alt="">
                            
                            <!--已结束 -->
                            <img v-if="new Date().getTime()>new Date(slide.begin_day+' '+slide.end_time).getTime()" class="txt vm g10" src="../assets/images/txt3.png" alt="">
                        </div>
                        <p class="name">{{slide.course_name}}</p>
                        <p class="start-time">{{slide.begin_day}}({{slide.begin_time}}~{{slide.end_time}})</p>
                    </div>
                </swiper-slide>
            </swiper>

            <p class="result" v-if="swiperSlides2===null">暂无数据</p>
        </div>

       

    </div>
</template>

<script>
import all from '../../config/dev.env.js'
import top from '../components/top'
export default {
    data(){
        return{
            logined:true,
            // loading:false,
            currentMonth:'',
            userName:localStorage.getItem('sname'),
            avatar:localStorage.getItem('avatar'),
            aid:localStorage.getItem('aid'),
            sid:localStorage.getItem('sid'),

            status:1,
            showMonth:false,
            currentMonth:'',
            monthGroup:[1,2,3,4,5,6,7,8,9,10,11,12],

            swiperOption: {
                slidesPerView: 5,
                spaceBetween: 0,
                freeMode: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
            },
            swiperSlides1: [],
            swiperSlides2:[],

        }
    },
    created(){
        // this.swiperSlides=this.swiperSlides1

        var date=new Date;
        var year=date.getFullYear(); 
        this.currentMonth=date.getMonth()+1;

        this.getItem1(1,this.currentMonth)
        this.getItem2(2,this.currentMonth)
    },
    mounted(){

    },
    methods:{
        tab(num){
            this.status=num

        },
        chooseMonth(){
            this.showMonth=!this.showMonth
        },
        choose(item){
            this.currentMonth=item
            this.showMonth=!this.showMonth
            this.getItem1(1,this.currentMonth)
            this.getItem1(2,this.currentMonth)
        },
        clock(current){
            // console.log(current.begin_day+' '+current.begin_time)
            // console.log('current',current)
            var startTime = new Date().getTime()
            var endTime = new Date(current.begin_day+' '+current.begin_time).getTime()-1000*60*30
            var result = endTime-startTime


            // console.log(current.begin_day+' '+current.begin_time)

            if(new Date(current.begin_day+' '+current.begin_time).getTime()-1000*60*60<new Date().getTime()&&new Date().getTime()<new Date(current.begin_day+' '+current.begin_time).getTime()-1000*60*30){

                var shengyuD=parseInt(result/(60*60*24*1000));//转换为天
                var D=parseInt(result)-parseInt(shengyuD*60*60*24*1000);//除去天的毫秒数
                var shengyuH=parseInt(D/(60*60*1000));//除去天的毫秒数转换成小时
                var H=D-shengyuH*60*60*1000;//除去天、小时的毫秒数
                var shengyuM=parseInt(H/(60*1000));//除去天的毫秒数转换成分钟
                var M=H-shengyuM*60*1000;//除去天、小时、分的毫秒数
                var S=parseInt((result-shengyuD*60*60*24*1000-shengyuH*60*60*1000-shengyuM*60*1000)/1000)//除去天、小时、分的毫秒数转化为秒
                var last = shengyuD+"天"+shengyuH+"小时"+shengyuM+"分"+S+"秒"
                this.$set(current,'timing',last)

            }

        },
        getItem1(type,month){
            this.loading=true
            this.$axios({
                method: 'get',
                url: all.test+'api/v1/student/courses',
                params: {
                    student_id:this.$route.params.student_id,
                    type:type,
                    month:month
                }
            }).then(res=>{
                console.log(res.data.data)
                this.loading=false
                if(res.data.data===null){
                    this.swiperSlides1=res.data.data
                    // this.$message.error('暂无数据');
                }else if(res.data.code==='0'){
                    this.swiperSlides1=res.data.data
                    var self = this
                    this.swiperSlides1.map((current,index)=>{
                        if(index===0){
                            setInterval(()=>{
                                self.clock(current)
                            },1000)
                        }
                    })
                    
                    this.status=1
                }else{
                    this.$message.error(res.data.message);
                }

            })
        },
        getItem2(type,month){
            this.loading=true
            this.$axios({
                method: 'get',
                url: all.test+'api/v1/student/courses',
                params: {
                    student_id:this.$route.params.student_id,
                    type:type,
                    month:month
                }
            }).then(res=>{
                this.loading=false
                if(res.data.data===null){
                    this.swiperSlides2=res.data.data
                }else if(res.data.code==='0'){
                    this.swiperSlides2=res.data.data
                    this.status=2
                }else{
                    this.$message.error(res.data.message);
                }

            })
        },
        goDetail(current){
            // this.$router.push(`/lessondetail/${current.student_id}/${current.timetable_id}`)
            if(new Date().getTime()>new Date(current.begin_day+' '+current.begin_time).getTime()){
                this.$router.push(`/lessondetail/${current.student_id}/${current.timetable_id}`)
            }else{
                this.$message.error('课程尚未开始');
            }
        }
    },
    components:{
        top
    }
}
</script>

<style soped>
.lessonitem {background: url('../assets/images/bj1.jpg') no-repeat center center;background-size: cover;height: 100vh;
    position: relative;}

.board {background: url('../assets/images/board.png') no-repeat;width: 183px;height: 104px;
position: absolute;right: 0;top: 60px;}
.board-box {position: relative;}
.board-head {font-size: 24px;color:#fff;margin-top: 44px;height: 60px;display:flex;justify-content: center;
    align-items: center;cursor: pointer;}
.board-head .arrow {width: 24px;height: 24px;margin:3px 0 0 13px;transition:all ease .3s;
transform:rotate(0deg);}
.board-head .arrow-on {transform:rotate(180deg);}
.board-body {width:220px;background: #8E2A2A;border-radius:20px;position: absolute;top: 90px;right: 20px;z-index:100;
-webkit-transform: scale(0);
transform: scale(0);
-webkit-transform-origin: center top;
transform-origin: center top;
-webkit-animation: spring-scale-hide .5s linear;
animation: spring-scale-hide .5s linear;
}
.board-show {animation: spring-scale-show .5s linear forwards;}
.board-con {padding:10px 0;}
.board-inner {position: relative;}
.shape {position: absolute;right: 0;top: -20px;width: 59px;height: 30px;z-index:90;}
.month-list {height:47px;line-height: 47px;text-align: center;color:#fff;transition:all ease .3s;
background: #8E2A2A;width: 100%;font-size: 20px;cursor: pointer;}
.month-list:hover {background: #F18A00;}
.month-on {background: #F18A00;}

.tab-group {width: 280px;margin:3% auto 0;}
.tab-group .tab-list {height: 40px;line-height: 40px;text-align: center;font-size: 18px;width: 140px;
    background: #fff;color:#9C1D22;transition:all ease .3s;}
.tab-group .start {border-radius:20px 0px 0px 20px;}
.tab-group .end {border-radius:0px 20px 20px 0px;}
.tab-group .tab-on {background: #8E2A2A;color:#fff;}

.swiper-box {margin-top: 3%;cursor: move;}
.swiper-container {padding:110px 0 0 0;}
.swiper-box .chart {position: relative;width: 50%;margin:0 auto;}
.swiper-box .chart .robot {transition:all ease .3s;opacity: 1;}
.swiper-box .chart .txt {position: absolute;top:34%;left: 0;width: 100%;transition:all ease .3s;
transform:scale(1.2,1.2);opacity: 0;}
.swiper-box .chart .time {background: url('../assets/images/os.png') no-repeat;width: 245px;height: 162px;z-index:300;
position: absolute;right: -110%;top: -110px;}
.swiper-box .time {padding-top: 80px;}
.swiper-box .time .last-time {font-size:18px;color:#242526;}
.swiper-box .time .last-time i{color:#0080FF;}
.slide {width: 80%;margin:0 auto;cursor: pointer;transition:all ease .3s;}
.slide .name {font-size:24px;color:#fff;margin:15px 0 10px 0;}
.slide:hover .chart .robot {opacity:0.6;}
.slide .start-time {font-size:16px;color:#fff;}
.slide:hover .txt {opacity:1;}

.result {font-size:36px;display:flex;justify-content: center;align-items: center;color:#fff;}
.tips {font-size: 16px;color:#fff;margin-top: 20px;}

@-webkit-keyframes spring-scale-hide{0%{opacity:0.97;-webkit-transform:scale(0.985);}1%{opacity:0.9169;-webkit-transform:scale(0.95845);}2%{opacity:0.84691;-webkit-transform:scale(0.92346);}3%{opacity:0.76552;-webkit-transform:scale(0.88276);}4%{opacity:0.67743;-webkit-transform:scale(0.83872);}5%{opacity:0.58664;-webkit-transform:scale(0.79332);}6%{opacity:0.49641;-webkit-transform:scale(0.74821);}7%{opacity:0.40934;-webkit-transform:scale(0.70467);}8%{opacity:0.32739;-webkit-transform:scale(0.6637);}9%{opacity:0.25202;-webkit-transform:scale(0.62601);}10%{opacity:0.18416;-webkit-transform:scale(0.59208);}11%{opacity:0.12434;-webkit-transform:scale(0.56217);}12%{opacity:0.07276;-webkit-transform:scale(0.53638);}13%{opacity:0.02932;-webkit-transform:scale(0.51466);}14%{opacity:-0.00632;-webkit-transform:scale(0.49684);}15%{opacity:-0.03464;-webkit-transform:scale(0.48268);}16%{opacity:-0.05626;-webkit-transform:scale(0.47187);}17%{opacity:-0.07187;-webkit-transform:scale(0.46407);}18%{opacity:-0.08219;-webkit-transform:scale(0.4589);}19%{opacity:-0.08799;-webkit-transform:scale(0.456);}20%{opacity:-0.08999;-webkit-transform:scale(0.45501);}21%{opacity:-0.08889;-webkit-transform:scale(0.45556);}22%{opacity:-0.08534;-webkit-transform:scale(0.45733);}23%{opacity:-0.07994;-webkit-transform:scale(0.46003);}24%{opacity:-0.07323;-webkit-transform:scale(0.46339);}25%{opacity:-0.06565;-webkit-transform:scale(0.46717);}26%{opacity:-0.05763;-webkit-transform:scale(0.47119);}27%{opacity:-0.04948;-webkit-transform:scale(0.47526);}28%{opacity:-0.04148;-webkit-transform:scale(0.47926);}29%{opacity:-0.03383;-webkit-transform:scale(0.48309);}30%{opacity:-0.02669;-webkit-transform:scale(0.48665);}31%{opacity:-0.02019;-webkit-transform:scale(0.48991);}32%{opacity:-0.01438;-webkit-transform:scale(0.49281);}33%{opacity:-0.0093;-webkit-transform:scale(0.49535);}34%{opacity:-0.00495;-webkit-transform:scale(0.49752);}35%{opacity:-0.00133;-webkit-transform:scale(0.49934);}36%{opacity:0.00161;-webkit-transform:scale(0.5008);}37%{opacity:0.00391;-webkit-transform:scale(0.50196);}38%{opacity:0.00564;-webkit-transform:scale(0.50282);}39%{opacity:0.00685;-webkit-transform:scale(0.50342);}40%{opacity:0.00761;-webkit-transform:scale(0.5038);}41%{opacity:0.00799;-webkit-transform:scale(0.504);}42%{opacity:0;-webkit-transform:scale(0.5);}100%{opacity:0;-webkit-transform:scale(0.5);}}@keyframes spring-scale-hide{0%{opacity:0.97;transform:scale(0.985);}1%{opacity:0.9169;transform:scale(0.95845);}2%{opacity:0.84691;transform:scale(0.92346);}3%{opacity:0.76552;transform:scale(0.88276);}4%{opacity:0.67743;transform:scale(0.83872);}5%{opacity:0.58664;transform:scale(0.79332);}6%{opacity:0.49641;transform:scale(0.74821);}7%{opacity:0.40934;transform:scale(0.70467);}8%{opacity:0.32739;transform:scale(0.6637);}9%{opacity:0.25202;transform:scale(0.62601);}10%{opacity:0.18416;transform:scale(0.59208);}11%{opacity:0.12434;transform:scale(0.56217);}12%{opacity:0.07276;transform:scale(0.53638);}13%{opacity:0.02932;transform:scale(0.51466);}14%{opacity:-0.00632;transform:scale(0.49684);}15%{opacity:-0.03464;transform:scale(0.48268);}16%{opacity:-0.05626;transform:scale(0.47187);}17%{opacity:-0.07187;transform:scale(0.46407);}18%{opacity:-0.08219;transform:scale(0.4589);}19%{opacity:-0.08799;transform:scale(0.456);}20%{opacity:-0.08999;transform:scale(0.45501);}21%{opacity:-0.08889;transform:scale(0.45556);}22%{opacity:-0.08534;transform:scale(0.45733);}23%{opacity:-0.07994;transform:scale(0.46003);}24%{opacity:-0.07323;transform:scale(0.46339);}25%{opacity:-0.06565;transform:scale(0.46717);}26%{opacity:-0.05763;transform:scale(0.47119);}27%{opacity:-0.04948;transform:scale(0.47526);}28%{opacity:-0.04148;transform:scale(0.47926);}29%{opacity:-0.03383;transform:scale(0.48309);}30%{opacity:-0.02669;transform:scale(0.48665);}31%{opacity:-0.02019;transform:scale(0.48991);}32%{opacity:-0.01438;transform:scale(0.49281);}33%{opacity:-0.0093;transform:scale(0.49535);}34%{opacity:-0.00495;transform:scale(0.49752);}35%{opacity:-0.00133;transform:scale(0.49934);}36%{opacity:0.00161;transform:scale(0.5008);}37%{opacity:0.00391;transform:scale(0.50196);}38%{opacity:0.00564;transform:scale(0.50282);}39%{opacity:0.00685;transform:scale(0.50342);}40%{opacity:0.00761;transform:scale(0.5038);}41%{opacity:0.00799;transform:scale(0.504);}42%{opacity:0;transform:scale(0.5);}100%{opacity:0;transform:scale(0.5);}}
@-webkit-keyframes spring-scale-show{0%{opacity:0.03;-webkit-transform:scale(0.515);}1%{opacity:0.0831;-webkit-transform:scale(0.54155);}2%{opacity:0.15309;-webkit-transform:scale(0.57654);}3%{opacity:0.23448;-webkit-transform:scale(0.61724);}4%{opacity:0.32257;-webkit-transform:scale(0.66128);}5%{opacity:0.41336;-webkit-transform:scale(0.70668);}6%{opacity:0.50359;-webkit-transform:scale(0.75179);}7%{opacity:0.59066;-webkit-transform:scale(0.79533);}8%{opacity:0.67261;-webkit-transform:scale(0.8363);}9%{opacity:0.74798;-webkit-transform:scale(0.87399);}10%{opacity:0.81584;-webkit-transform:scale(0.90792);}11%{opacity:0.87566;-webkit-transform:scale(0.93783);}12%{opacity:0.92724;-webkit-transform:scale(0.96362);}13%{opacity:0.97068;-webkit-transform:scale(0.98534);}14%{opacity:1.00632;-webkit-transform:scale(1.00316);}15%{opacity:1.03464;-webkit-transform:scale(1.01732);}16%{opacity:1.05626;-webkit-transform:scale(1.02813);}17%{opacity:1.07187;-webkit-transform:scale(1.03593);}18%{opacity:1.08219;-webkit-transform:scale(1.0411);}19%{opacity:1.08799;-webkit-transform:scale(1.044);}20%{opacity:1.08999;-webkit-transform:scale(1.04499);}21%{opacity:1.08889;-webkit-transform:scale(1.04444);}22%{opacity:1.08534;-webkit-transform:scale(1.04267);}23%{opacity:1.07994;-webkit-transform:scale(1.03997);}24%{opacity:1.07323;-webkit-transform:scale(1.03661);}25%{opacity:1.06565;-webkit-transform:scale(1.03283);}26%{opacity:1.05763;-webkit-transform:scale(1.02881);}27%{opacity:1.04948;-webkit-transform:scale(1.02474);}28%{opacity:1.04148;-webkit-transform:scale(1.02074);}29%{opacity:1.03383;-webkit-transform:scale(1.01691);}30%{opacity:1.02669;-webkit-transform:scale(1.01335);}31%{opacity:1.02019;-webkit-transform:scale(1.01009);}32%{opacity:1.01438;-webkit-transform:scale(1.00719);}33%{opacity:1.0093;-webkit-transform:scale(1.00465);}34%{opacity:1.00495;-webkit-transform:scale(1.00248);}35%{opacity:1.00133;-webkit-transform:scale(1.00066);}36%{opacity:0.99839;-webkit-transform:scale(0.9992);}37%{opacity:0.99609;-webkit-transform:scale(0.99804);}38%{opacity:0.99436;-webkit-transform:scale(0.99718);}39%{opacity:0.99315;-webkit-transform:scale(0.99658);}40%{opacity:0.99239;-webkit-transform:scale(0.9962);}41%{opacity:0.99201;-webkit-transform:scale(0.996);}42%{opacity:1;-webkit-transform:scale(1);}100%{opacity:1;-webkit-transform:scale(1);}}@keyframes spring-scale-show{0%{opacity:0.03;transform:scale(0.515);}1%{opacity:0.0831;transform:scale(0.54155);}2%{opacity:0.15309;transform:scale(0.57654);}3%{opacity:0.23448;transform:scale(0.61724);}4%{opacity:0.32257;transform:scale(0.66128);}5%{opacity:0.41336;transform:scale(0.70668);}6%{opacity:0.50359;transform:scale(0.75179);}7%{opacity:0.59066;transform:scale(0.79533);}8%{opacity:0.67261;transform:scale(0.8363);}9%{opacity:0.74798;transform:scale(0.87399);}10%{opacity:0.81584;transform:scale(0.90792);}11%{opacity:0.87566;transform:scale(0.93783);}12%{opacity:0.92724;transform:scale(0.96362);}13%{opacity:0.97068;transform:scale(0.98534);}14%{opacity:1.00632;transform:scale(1.00316);}15%{opacity:1.03464;transform:scale(1.01732);}16%{opacity:1.05626;transform:scale(1.02813);}17%{opacity:1.07187;transform:scale(1.03593);}18%{opacity:1.08219;transform:scale(1.0411);}19%{opacity:1.08799;transform:scale(1.044);}20%{opacity:1.08999;transform:scale(1.04499);}21%{opacity:1.08889;transform:scale(1.04444);}22%{opacity:1.08534;transform:scale(1.04267);}23%{opacity:1.07994;transform:scale(1.03997);}24%{opacity:1.07323;transform:scale(1.03661);}25%{opacity:1.06565;transform:scale(1.03283);}26%{opacity:1.05763;transform:scale(1.02881);}27%{opacity:1.04948;transform:scale(1.02474);}28%{opacity:1.04148;transform:scale(1.02074);}29%{opacity:1.03383;transform:scale(1.01691);}30%{opacity:1.02669;transform:scale(1.01335);}31%{opacity:1.02019;transform:scale(1.01009);}32%{opacity:1.01438;transform:scale(1.00719);}33%{opacity:1.0093;transform:scale(1.00465);}34%{opacity:1.00495;transform:scale(1.00248);}35%{opacity:1.00133;transform:scale(1.00066);}36%{opacity:0.99839;transform:scale(0.9992);}37%{opacity:0.99609;transform:scale(0.99804);}38%{opacity:0.99436;transform:scale(0.99718);}39%{opacity:0.99315;transform:scale(0.99658);}40%{opacity:0.99239;transform:scale(0.9962);}41%{opacity:0.99201;transform:scale(0.996);}42%{opacity:1;transform:scale(1);}100%{opacity:1;transform:scale(1);}}
</style>