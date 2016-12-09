<template>
  <div id="app">
    <img src="./assets/logo.png">
    <img src="./assets/images/bg-countdown.jpg" alt="">
    <img src="./assets/images/applgBg.png" alt="">
    <hello></hello>
  </div>
</template>

<script>
//  require('./assets/sass/demo.scss')
import config from './assets/js/config_var.js'
import zepto from './assets/js/zepto-1.1.6.js'
import Hello from './components/Hello'


export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style lang="scss">

@import './assets/sass/tryPresentation.scss';

div.demo
{
  display:flex;
  width:750px;
  height:750px;/*no*/
  border:1px solid red;/*no*/
  padding-left:30px;
}


</style>
