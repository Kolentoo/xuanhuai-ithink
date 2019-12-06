<template>
        <div class="wrong">
            <div class="btn-box">
                <div class="btn" @click="goBack">返回首页</div>
            </div>
        </div>
    </template>
    
    <script>
    export default {
        data(){
            return{
    
            }
        },
        created(){
    
        },
        methods:{
            goBack(){
                this.$router.push('')
            }
        }
    }
    </script>
    
    <style scoped>
        .wrong {background: url('../assets/images/500.png') no-repeat center center;background-size: cover;height: 100vh;}
        .btn-box {padding-top: 62%;}
        .btn {width: 275px;height: 62px;font-size: 26px;border-radius:400px;text-align: center;color:#fff;
        margin:0 auto;background: rgb(0,128,227);line-height: 60px;}
    </style>