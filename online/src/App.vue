<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    let tk = localStorage.getItem('token');
    this.$axios.defaults.headers.common['access-token'] = tk;
  }
}
</script>

<style>
#app {font-family: 'Microsoft YaHei';}
</style>