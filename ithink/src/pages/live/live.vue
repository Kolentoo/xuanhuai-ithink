<template>
  <div class="live">
    <top></top>
    <iframe class="ibox fl" :src="url" frameborder="0"
    allow="camera *; microphone *; autoplay *; midi *; encrypted-media *;"></iframe>
  </div>
</template>

<script>
import all from '../../../config/dev.env.js'
import top from '../../components/top/top'
export default {
  data(){
    return{
      url: `${all.test}api/v1/talk/entry?student_id=${this.$route.params.student_id}&timetable_id=${this.$route.params.timetable_id}`
    }
  },
  components:{
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