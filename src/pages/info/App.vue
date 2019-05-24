<template>
  <div id="app">
      <div class="bgcolor"></div>
    <router-view/>
  </div>
</template>
<script>
    import root from './views/info-index'
  export default {
          components:{
              root
          },
          methods:{
          }

      // async created(){
      //   let info =  await request('/api/ChuangCeShi/index','post',{
      //       param1:1,
      //       param2:2
      //   },'application/x-www-form-urlencoded')
      //   let infoResult = result(info)
      //   if(!infoResult) return
      //   //逻辑代码
      // }
  }
</script>
<style lang="less">
  @import "~static/css/minxin.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .bgcolor{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 358rem/@rootFontSize;
      background: #e6a551;
  }
</style>
