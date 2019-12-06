// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/styles/core.css'

Vue.config.productionTip = false

// element相关
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// axios
import axios from 'axios'
Vue.prototype.$axios = axios

import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// 导航守卫
router.beforeEach((to,from,next)=>{
  var tk1 = window.localStorage.getItem('token');
  if(!tk1 && to.path!=='/'&&to.path!=='/download'){
      next('/')
  }else if(!tk1 && to.path=='download'){
      next('download')
  }else if(tk1 && to.path!=='/'){
      next()
  }else{
      next()
      // window.localStorage.clear()
  }
})
