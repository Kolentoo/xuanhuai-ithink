<template>
  <div class="lessondetail clearfix">
    <top :logined="logined" :userName="userName" :avatar="avatar" :aid="aid" :sid="sid"></top>

    <iframe class="ibox fl" :src="url" frameborder="0"
            allow="camera *; microphone *; autoplay *; midi *; encrypted-media *;"></iframe>
  </div>
</template>

<script>
  import all from '../../config/dev.env.js'
  import top from '../components/top'

  export default {
    data() {
      return {
        userName: localStorage.getItem('sname'),
        avatar: localStorage.getItem('avatar'),
        aid: localStorage.getItem('aid'),
        sid: localStorage.getItem('sid'),
        logined: true,
        url: `${all.test}api/v1/talk/entry?student_id=${this.$route.params.student_id}&timetable_id=${this.$route.params.timetable_id}`
      }
    },
    created() {
      console.log('100')
    },
    methods: {},
    components: {
      top
    }
  }
</script>

<style scoped>
  .ibox {
    width: 100%;
    height: calc(100vh - 60px);
  }
</style>