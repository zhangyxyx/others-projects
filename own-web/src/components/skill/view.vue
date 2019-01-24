<template>
<div class="row">
   <mycommon v-bind:message="parentMsg"></mycommon>
   <div class="skillselect">
       <ul>
           <li v-for="(item,index) in items" :key="index" v-on:click="clickImg(item.icon)">{{item.name}}</li>
       </ul>
   </div>
   <mycomponent :is="myicon"></mycomponent>
</div>
</template>
<script>
import common from '../owncommon.vue'
import zhe from './zhe.vue'
import zhu from './zhu.vue'
import bing from './bing.vue'

export default{
    data(){
        return{
            parentMsg:'skill',
            items:[
                {name:'折线图',icon:'zhe'},
                {name:'柱状图',icon:'zhu'},
                {name:'饼图',icon:'bing'}
            ],
            myicon:'zhe'
        }
    },
   components:{
       'mycommon':common,
       zhe,
       zhu,
       bing,
   },
   methods:{
       clickImg:function(icon){
          this.myicon=icon
       }
   }
}
</script>
<style>
.skillselect{
    margin:20px 0px;
}
.skillselect ul{
    width:100%;
    height:40px;
    list-style-type:none;
    margin:0px;
    padding:0px;
    
}

.skillselect ul li{
    list-style-type:none;
    width:80px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border-bottom:1px solid #fff;
    cursor:pointer;
}
</style>