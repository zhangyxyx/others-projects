<template>
<div>
    <!--顶部的菜单-->
	<div class="homeTop">
		<span v-for="(item,index) in topMenu" v-on:click="clickTopMenu(index,item.icon)" :class="{active:ind===index}" :key="index">{{item.con}}
        </span>
	</div>
</div>
</template>
<script>
export default{
    data(){
        return{
            topMenu:[
                {con:'外卖',icon:'takeout'},
                {con:'订单',icon:'goods'},
                {con:'发现',icon:'find'},
                {con:'我的',icon:'me'},
            ],
            login:[
                {con:'登录',icon:'login'},
                {con:'注册',icon:'register'}
            ],
            ind:0,
            mark:'',
        }
    },
    props:["message"],
    mounted:function(){
        this.markshow();
    },

    methods:{
        markshow(){
            this.ind=this.message
        },
        clickTopMenu(i,icon){
            this.ind=i;
            this.comMessage=icon;
            this.$router.push('/'+icon)
        },
        
    }
}
</script>
<style>
/*顶部菜单*/
.homeTop{
    width:7.5rem;
	height:0.99rem;
    line-height:0.99rem;
    position:fixed;
    bottom:0px;
    background:#fff;
}
.homeTop span{
	width:25%;
    height:0.99rem;
    line-height:0.99rem;
    font-size:0.2rem;
    display:block;
    float:left;
    text-align:center;
}
.homeTop span:hover{
	color:blue
}
.homeTop .active{
	color:blue;
}
</style>