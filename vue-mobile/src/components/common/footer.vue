<template>
<div class="footer">
    <div class="footer_con">
        <span v-on:click="clicklink(item.mark)" v-for="(item ,index) in footerData" :key="index">{{item.name}}</span>
    </div>
</div>
</template>

<script>
import $ from 'jquery' 
export default {
    data(){
        return{
            footerData:[
                {name:'首页',mark:'home'},
                {name:'沸点',mark:'feidian'},
                {name:'搜索',mark:'search'},
                {name:'个人',mark:'user'}
            ]
        }
    },
    mounted:function(){
        this.footerW()
    },
    methods:{
        footerW(){
            var width=$(window).width();
            $(".footer").css("width",width+"px")
        },
        clicklink(mark){
            console.log(mark)
            this.$router.push('/'+mark);
        }
    }
}
</script>

<style>
.footer{
    position:fixed;bottom:0px;left:0px;
}
.footer_con{
    border-top:1px solid #ccc;width:100%;height:0.4rem;line-height:0.4rem;background:#fff;line-height:0.4rem;}
.footer_con span{
    width:25%;text-align:center;display:block;float:left;
}
</style>
