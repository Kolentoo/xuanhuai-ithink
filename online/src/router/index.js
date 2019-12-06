import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import mylesson from '../pages/mylesson.vue'
import lessonitem from '../pages/lessonitem.vue'
import information from '../pages/information.vue'
import lessondetail from '../pages/lessondetail.vue'
import download from '../pages/download.vue'
import notfound from '../pages/404.vue'
import wrong from '../pages/500.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/mylesson/:account_id/:student_id',
      name: 'mylesson',
      component: mylesson
    },
    {
      path: '/lessonitem/:student_id',
      name: 'lessonitem',
      component: lessonitem
    },
    {
      path: '/information/:student_id',
      name: 'information',
      component: information
    },
    {
      path: '/lessondetail/:student_id/:timetable_id',
      name: 'lessondetail',
      component: lessondetail
    },
    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/404',
      name: 'notfound',
      component: notfound
    },
    {
      path: '/500',
      name: 'wrong',
      component: wrong
    }
  ]
})
