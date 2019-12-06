import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import lesson from '@/pages/lesson/lesson'
import detail from '@/pages/detail/detail'
import live from '@/pages/live/live'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/lesson/:account_id/:student_id',
      name: 'lesson',
      component: lesson
    },
    {
      path: '/detail/:student_id/:course_id/:class_id',
      name: 'detail',
      component: detail
    },
    {
      path: '/live/:student_id/:timetable_id',
      name: 'live',
      component: live
    }
  ]
})
