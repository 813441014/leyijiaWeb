<template>
  <div class="main">
    <router-view/>

  </div>
</template>
<script>
  import root from './views/project-index'
  export default {
    components:{
        root
    }
  }
</script>
<style lang="less">
  .main{
    height: 100%;
    width: 100%;
  }
</style>
