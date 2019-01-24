<template>
<div class="home_row">
    <div class="row_header">
        <div style="float:left;">
            <span>gainloss</span>
        </div>
        <div style="float:right">
            <span>vue.js/前端</span>
        </div>
    </div>
    <div class="row_content">
        <div style="font-size:0.2rem;font-weight:bold;padding:10px 0px;">你和高级工程师的差距在哪儿？</div>
        <div style="color:#ccc;">高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师</div>
    </div>
    <div class="row_footer">
        <div style="padding:10px;float:left;">
            <img src="src/assets/like.png" style="width:0.2rem;height:0.2rem;float:left;">
            <div style="float:left;margin-left:0.05rem">喜欢</div>
        </div>
        <div style="padding:10px;float:left;">
            <img src="src/assets/pinglun.png" style="width:0.2rem;height:0.2rem;float:left;">
            <div style="float:left;margin-left:0.05rem">评论</div>
        </div>
    </div>
</div> 
</template>

<script>
export default {
    data(){
        return{}
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.home_row{  
        padding:0px 10px;height:auto;display:inline-block;margin:20px 0px;background:#fff;
}
.home_row .row_header{
        height:0.4rem;line-height:0.4rem;width:100%;font-size:0.14rem;
}
.home_row .row_footer{
    font-size:0.12rem;
}
</style>
