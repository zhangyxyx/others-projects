<template>
<div class="common">
    <div style="float:left;margin:0px 20px;">
        <p style="float:left;width:50px;height:50px;"><img src="./image/logo.png" style="width:100%;border-radius:50%;"></p>
        <p style="float:left;font-size:18px;font-family:'黑体';margin-left:10px;line-height:83px;height:68px;">诗和远方</p>
    </div>
    <div class="menu" v-for="(menu,index) in menus" :key="index" v-on:click="clickMenu(menu.icon)" v-bind:class="{active:message==menu.icon}">
       {{menu.name}}
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            menus:[
                {name:'主页',icon:'home'},
                {name:'文章',icon:'article'},
                {name:'技能',icon:'skill'},
                {name:'联系',icon:'concat'},
                {name:'留言',icon:'seek'},
            ]
        }
    },
    props:['message'],
    methods:{
        clickMenu:function(icon){
            console.log(icon)
            this.$router.push('/own/'+icon)
        }
    }
}
</script>

<style>
.common{
    height:60px;
    line-height:60px;
    font-size:20px;
    box-shadow:0px 5px 5px rgba(0,0,0,.2)
}
.menu{
    float:left;
    width:100px;
    text-align:center;
    background:#f5f9fc;
    cursor:pointer;
    float:left;
}
.menu:hover{
    background:#fff;
}
.active{
    background:#fff;
}
</style>
