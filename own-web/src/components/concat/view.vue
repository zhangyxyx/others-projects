<template>
<div class="row concat">
  <mycommon v-bind:message="parentMsg"></mycommon>
  <h3>联系邮箱</h3>
  <span>zyx930719@126.com</span></br>
  <h3>Github</h3>
  <span><a href="https://github.com/GainLoss" target="_blank">https://github.com/GainLoss</a></span>
  <h3>博客</h3>
  <span><a href="http://www.cnblogs.com/GainLoss/" target="_blank">http://www.cnblogs.com/GainLoss/</a></span>
</div>
</template>
<script>
import common from '../owncommon'
export default{
  data(){
    return{
      parentMsg:'concat'
    }
  },
   components:{
     'mycommon':common
   }
}
</script>
<style>
.concat h1{height:30px;line-height:30px;}
.concat span{display:block;height:40px;line-height:40px;background:#fff;}
</style>