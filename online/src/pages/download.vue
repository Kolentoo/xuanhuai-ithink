<template>
    <div class="download">
        <top :logined="logined" :userName="userName" :avatar="avatar" :aid="aid" :sid="sid"></top>
        <div class="banner"></div>
        <div class="content">
            <div class="tab-head">
                <ul class="tab-con clearfix">
                    <li :class="['tab-list fl',{'tab-on':current===1}]" @click="tab(1)"><p class="p1">windows</p></li>
                    <li :class="['tab-list fl',{'tab-on':current===2}]" @click="tab(2)"><p class="p1">macOS</p></li>
                    <li :class="['tab-list fl',{'tab-on':current===3}]" @click="tab(3)"><p class="p1">iOS</p></li>
                    <li :class="['tab-list fl',{'tab-on':current===4}]" @click="tab(4)"><p class="p1">Android</p></li>
                </ul>
            </div>
            <div class="tab-body">
                <div class="item" v-if="current===1">
                    <div class="pic-box">
                        <img class="g10 vm" src="../assets/images/windows.png" alt="">
                    </div>
                    <div class="desc">
                        <p class="p1">Windows系统客户端下载</p>
                        <p class="p2">版本说明：支持在线上课，实时监控孩子上课</p>
                        <p class="p2">大小：49KB</p>
                        <p class="p2">适应系统：Windows 7 以上</p>
                        <p class="p2">版本：拓课云 3.2.0</p>
                        <p class="p2">更新时间：2019.01.16</p>
                        <p class="btn" @click="downloadPc1">立即下载</p>
                    </div>
                </div>
                <div class="item" v-if="current===2">
                    <div class="pic-box">
                        <img class="g10 vm" src="../assets/images/windows.png" alt="">
                    </div>
                    <div class="desc">
                        <p class="p1">MAC 系统客户端下载</p>
                        <p class="p2">版本说明：支持在线上课，实时监控孩子上课</p>
                        <p class="p2">大小：67MB</p>
                        <p class="p2">适应系统：Mac 苹果电脑</p>
                        <p class="p2">版本：拓课云 3.2.0</p>
                        <p class="p2">更新时间：2019.01.16</p>
                        <p class="btn" @click="downloadPc2">立即下载</p>
                    </div>
                </div>
                <div class="item ios" v-if="current===3">
                    <div class="item-con">
                        <div class="pic-box">
                            <img class="g10 vm" src="../assets/images/ios1.png" alt="">
                        </div>
                        <div class="desc">
                            <p class="p1">拓课云plus3.2 客户端下载</p>
                            <p class="p2">版本说明：提供了多种界面模版和样式的支持，包括生动活泼的少儿卡通界面样式</p>
                            <p class="p2">硬件要求：iPad air 或以上</p>
                            <p class="p2">软件系统：iOS 9.0 或更高版本</p>
                            <p class="p2">下载方法一：在 App Store 中搜索 “拓课云plus” 下载 </p>
                            <p class="p2">下载方法二：扫一扫二维码下载</p>
                            <img class="code vm block" src="../assets/images/code1.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="pic-box">
                            <img class="g10 vm" src="../assets/images/ios2.png" alt="">
                        </div>
                        <div class="desc">
                            <p class="p1">拓课云2.0 iPad 客户端下载</p>
                            <p class="p2">版本说明：支持在线上课，实时监控孩子上课</p>
                            <p class="p2">硬件要求：iPad air 或以上</p>
                            <p class="p2">软件系统：iOS 9.0 或更高版本</p>
                            <p class="p2">下载方法一：在 App Store 中搜索 “拓课云HD” 下载 </p>
                            <p class="p2">下载方法二：扫一扫二维码下载</p>
                            <img class="code vm block" src="../assets/images/code2.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="pic-box">
                            <img class="g10 vm" src="../assets/images/ios3.png" alt="">
                        </div>
                        <div class="desc">
                            <p class="p1">拓课云2.0 iPhone 客户端下载</p>
                            <p class="p2">版本说明：支持在线上课，实时监控孩子上课</p>
                            <p class="p2">硬件要求：iPad air 或以上</p>
                            <p class="p2">软件系统：iOS 9.0 或更高版本</p>
                            <p class="p2">下载方法一：在 App Store 中搜索 “拓课云” 下载 </p>
                            <p class="p2">下载方法二：扫一扫二维码下载</p>
                            <img class="code vm block" src="../assets/images/code3.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="item ios" v-if="current===4">
                    <div class="item-con">
                        <div class="pic-box">
                            <img class="g10 vm" src="../assets/images/anzhuo1.png" alt="">
                        </div>
                        <div class="desc">
                            <p class="p1">拓课云3.2 客户端下载</p>
                            <p class="p2">版本说明：提供了多种界面模版和样式的支持，包括生动活泼的少儿卡通界面样式、简洁大方的黑色内敛界面样式</p>
                            <p class="p2">软件系统：建议Android6.0以上版本</p>
                            <p class="p2">下载方法一：<i class="downloadlink" @click="downloadAnzhuo1">下载到本地</i></p>
                            <p class="p2">下载方法二：扫一扫二维码下载</p>
                            <img class="code vm block" src="../assets/images/code4.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="pic-box">
                            <img class="g10 vm" src="../assets/images/anzhuo2.png" alt="">
                        </div>
                        <div class="desc">
                            <p class="p1">拓课云2.0 Pad 客户端下载</p>
                            <p class="p2">版本说明：支持在线上课，实时监控孩子上课</p>
                            <p class="p2">软件系统：建议Android6.0以上版本</p>
                            <p class="p2">下载方法一：<i class="downloadlink" @click="downloadAnzhuo2">下载到本地</i></p>
                            <p class="p2">下载方法二：扫一扫二维码下载</p>
                            <img class="code vm block" src="../assets/images/code5.png" alt="">
                        </div>
                    </div>
                    <div class="item-con">
                        <div class="pic-box">
                            <img class="g10 vm" src="../assets/images/anzhuo3.png" alt="">
                        </div>
                        <div class="desc">
                            <p class="p1">拓课云2.0 手机 客户端下载</p>
                            <p class="p2">版本说明：支持在线上课，实时监控孩子上课</p>
                            <p class="p2">软件系统：建议Android6.0以上版本</p>
                            <p class="p2">下载方法一：<i class="downloadlink" @click="downloadAnzhuo3">下载到本地</i></p>
                            <p class="p2">下载方法二：扫一扫二维码下载</p>
                            <img class="code vm block" src="../assets/images/code6.png" alt="">
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="info-box">
            <p class="title tc">上课电脑 / 平板电脑 / ipad / 配置要求</p>
            <div class="info-con">
                <div class="pic-box">
                    <img class="g10 vm" src="../assets/images/config.png" alt="">
                </div>
                <div class="desc">
                    <dl>
                        <dt>操作系统要求:</dt>
                        <dd>Windows7以上操作系统 /Apple Mac OS（苹果系统）/iPad IOS 9.0 /Android Pad 系统版本 4.4以上</dd>

                        <dt>耳麦要求：</dt>
                        <dd>台式机与笔记本推荐USB耳麦（推荐品牌“罗技”） </dd>
                        <dd>网络运营商： </dd>
                        <dd>推荐使用电信、联通、网通网络运营商，网络稳定不受上网高峰影响。</dd>

                        <dt>网络连接要求：</dt>
                        <dd>网线-使用网线连接电脑（无线网络，信号需要满格）</dd>

                        <dt>上课注意事项：</dt>
                        <dd>1. 上课过程中禁止插拔耳机，已拔插需要重启上课软件或浏览器; </dd>
                        <dd>2. 上课时候家人不可以使用网络观看电影，或下载; </dd>
                        <dd>3. 如果更换上课设备或网络必须联系助教进行测试网络。</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="other">
            <p class="title tc">其他工具下载</p>
            <ul class="other-con clearfix">
                <li class="other-list fl clearfix">
                    <div class="plugin-pic fl">
                        <img class="vm pic g10" src="../assets/images/plugin1.png" alt="">
                    </div>
                    <div class="intro fl">
                        <p class="p1">TeamView 远程协助软件</p>
                        <p class="p2">当有技术故障时候，打开此软件后，告知软件ID与密码，可快速远程协助修复故障。(软件关闭密码即无效，每次启动密码都不一样)</p>
                        <div class="btn-group">
                            <span class="pbtn">Windows 系统下载</span>
                            <span class="pbtn">Mac 系统下载</span>
                        </div>
                    </div>
                </li>
                <li class="other-list fl clearfix">
                    <div class="plugin-pic fl">
                        <img class="vm pic g10" src="../assets/images/plugin2.png" alt="">
                    </div>
                    <div class="intro fl">
                        <p class="p1">FlashPlayer 22 谷歌浏览器</p>
                        <p class="p2">可以更好的支持Flash版本教室</p>
                        <div class="btn-group">
                            <span class="pbtn">Windows 系统下载</span>
                            <span class="pbtn">Mac 系统下载</span>
                        </div>
                    </div>
                </li>
                <li class="other-list fl clearfix">
                    <div class="plugin-pic fl">
                        <img class="vm pic g10" src="../assets/images/plugin3.png" alt="">
                    </div>
                    <div class="intro fl">
                        <p class="p1">谷歌浏览器</p>
                        <p class="p2">我们推荐您使用谷歌浏览器，它是大名鼎鼎的谷歌公司开发的浏览器，上课稳定速度快</p>
                        <div class="btn-group">
                            <span class="pbtn">Windowa7及以上系统下载/版本：65.0.3325.181</span>
                            <span class="pbtn">Windows XP系统下载/版本：49.0.2623.112</span>
                            <span class="pbtn">Mac 系统下载/版本：63.0.3239.84</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="chrome" v-if="showChrome">
            <div class="chrome-box">
                <div class="chrome-con">
                    <img class="vm chrome-icon" src="../assets/images/chrome-icon.png" alt="">
                    <p class="p1">为保证您拥有优质的学习体验，强烈建议您使用Google Chrome浏览器，请下载并安装Chrome浏览器后，重新登录体验。</p>
                    <a target="_blank" href="https://www.google.cn/intl/zh-CN/chrome/" class="blcok"><img class="down-btn vm pointer" src="../assets/images/down-chrome.png" alt="">  </a>
                </div>
                <img class="close-chrome" @click="close" src="../assets/images/close-chrome.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import all from '../../config/dev.env.js'
import top from '../components/top'
export default {
    data(){
        return{
            showChrome:false,
            logined:false,
            userName:localStorage.getItem('sname'),
            avatar:localStorage.getItem('avatar'),
            aid:localStorage.getItem('aid'),
            sid:localStorage.getItem('sid'),

            current:1,
        }
    },
    created(){
        var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
        var closed = localStorage.getItem('closechrome');
        if(closed){
            this.showChrome=false
        }else{
            if (isChrome) {
                this.showChrome=false
            } else {
                this.showChrome=true
            }
        }

    },
    methods:{
        tab(item){
            this.current=item
        },
        downloadPc1(){
            window.location.href='http://doccdn-1253417915.cosgz.myqcloud.com/SDK/d37b8a3773bc66a11ec90d9d5ade93e0.exe'
        },
        downloadPc2(){
            window.location.href='http://doccdn-1253417915.cosgz.myqcloud.com/SDK/62530ecdb19d18e045c7e2ff91a1d534.zip'
        },
        downloadAnzhuo1(){
            window.location.href='http://doccdn-1253417915.cosgz.myqcloud.com/SDK/c0f267bdd57d93e230eb8c9e212e6136.apk'
        },
        downloadAnzhuo2(){
            window.location.href='http://doccdn-1253417915.cosgz.myqcloud.com/SDK/2b32b3ac82434d20bbd2453f23511200.apk'
        },
        downloadAnzhuo3(){
            window.location.href='http://doccdn-1253417915.cosgz.myqcloud.com/SDK/2e4a2f14d1e7400c6cfabcaee2595d16.apk'
        },
        downChrome(){

        },
        close(){
            this.showChrome=false
            localStorage.setItem('closechrome','close')
        }
    },
    components:{
        top
    }
}
</script>

<style scoped>
    .download {padding-bottom: 50px;}
    .top {position: absolute;width: 100%;left: 0;top: 0;z-index:200;background: none !important;}
    .banner {background: url('../assets/images/bj3.png') no-repeat center center;height: 570px;}
    .content {margin-top: 100px;}
    .tab-head {margin:0 auto;width: 80%;display:flex;justify-content: center;}
    .tab-con {width: 100%;display:flex;justify-content: center;}
    .tab-list {width:176px;height:44px;background:rgba(255,255,255,1);border:1px solid rgba(204,204,204,1);
    border-radius:4px;transition:all ease .3s;font-size: 18px;color:#4085FA;text-align: center;
    cursor: pointer;line-height: 44px;margin:0 4%;}
    .tab-list:hover {background: #4085FA;color:#fff;border-color:#4085FA;}
    .tab-on {background: #4085FA;color:#fff;border-color:#4085FA;}

    .tab-body {width: 70%;margin:40px auto 0;}
    .item {display:flex;justify-content: space-between;align-items: center;}
    .ios {display:block;}
    .item .pic-box {width: 55%;}
    .item .desc {margin-right: 10%;}
    .ios .desc {margin-left: 2%;margin-right: 0;}
    .item .desc .p1 {color:#575B64;font-size: 25px;margin-bottom: 15px;}
    .item .desc .p2 {color:#A7A7A7;font-size: 16px;line-height: 1.5;}
    .item-con {display:flex;justify-content: space-between;align-items: center;margin-top: 80px;}
    .item-con .pic-box {width: 50%;}
    .item-con .desc .p1 {margin-bottom: 20px;}
    .item-con .desc .p2 {margin-bottom: 10px;} 
    .code {width: 174px;margin-top: 20px;}
    .btn {width:178px;height:53px;background:rgba(64,133,250,1);border:1px solid rgba(112,112,112,1);
    text-align: center;line-height: 53px;color:#fff;font-size: 18px;margin-top: 50px;}

    .info-box {background: #F7F9FC;padding:100px 0;}
    .info-con {width: 80%;margin:0 auto;display:flex;justify-content: space-between;align-items: center;}
    .info-box .title {color:#575B64;font-size: 32px;margin-bottom: 70px;}
    .info-box .pic-box {width: 50%;}
    .desc {width: 45%;}
    .desc dt{color:#5f5f5f;font-size: 18px;margin-bottom: 10px;margin-top: 10px;}
    .desc dd{font-size: 16px;color:#A7A7A7;line-height: 1.4;}
    .downloadlink {color:#006eff;cursor: pointer;} 
    .downloadlink:hover {text-decoration: underline;}

    .other {background: #fff;padding:100px 0;}
    .other .title {font-size: 32px;color:#575B64;margin-bottom: 80px;}
    .plugin-pic {width: 15%;margin-right: 10px;}
    .other-con {width: 70%;margin:0 auto;}
    .other-list {width: 44%;margin:0 3% 0;height: 230px;}
    .intro {width: 80%;}
    .intro .p1 {font-size: 18px;color:#5F5F5F;margin-bottom: 10px;}
    .intro .p2 {font-size: 16px;color:#A7A7A7;line-height: 1.5;}
    .btn-group {margin-top: 20px;}
    .btn-group .pbtn {color:#5F5F5F;font-size: 14px;text-align: center;line-height: 40px;margin-right: 15px;
    display: inline-block;height:40px;background:rgba(255,255,255,1);border:1px solid rgba(112,112,112,1);
    border-radius:4px;padding:0 20px;cursor: pointer;margin-bottom: 10px;}

    .chrome {width: 100%;height: 92px;line-height: 92px;background: #F2F2F2;
    position: fixed;left: 0;bottom: 0;z-index:200;}
    .chrome-box {position: relative;}
    .chrome .chrome-con {width: 90%;margin:0 auto;display:flex;align-items: center;justify-content: space-between;}
    .chrome .chrome-con .p1 {color:#334856;font-size:16px;}
    .chrome .chrome-icon {width: 92px;height:92px;}
    .chrome .down-btn {width: 110px;height: 42px;text-align: center;}
    .chrome .close-chrome {position: absolute;width: 16px;height:16px;top: 15px;right:20px;cursor: pointer;}
</style>