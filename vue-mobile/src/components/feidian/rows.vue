<template>
<div class="feidian_row">
    <div class="row_header">
        <div style="float:left;">
            <span>gainloss</span>
        </div>
        <div style="float:left;width:1rem;height:0.4rem;">
            <span >用户名</span>
            <span >3小时前</span>
        </div>
    </div>
    <div class="row_content">
        <div style="color:#ccc;">高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师高级程序师</div>
    </div>
    <div class="row_footer">
        <div style="float:left;width:33%;text-align:center;padding:5px 0px">
            <div style="width:auto;display:inline-block">
                <img src="src/assets/like.png" style="width:0.2rem;height:0.2rem;float:left;">
                <div style="float:left;margin-left:0.05rem;margin-top:0.03rem">3</div>
            </div>
        </div>
        <div style="float:left;width:33%;text-align:center;padding:5px 0px">
            <div style="width:auto;display:inline-block">
                <img src="src/assets/pinglun.png" style="width:0.2rem;height:0.2rem;float:left;">
                <div style="float:left;margin-left:0.05rem;margin-top:0.03rem">7</div>
            </div>
        </div>
        <div style="float:left;width:33%;text-align:center;padding:5px 0px">
            <div style="width:auto;display:inline-block">
                <img src="src/assets/pinglun.png" style="width:0.2rem;height:0.2rem;float:left;">
                <div style="float:left;margin-left:0.05rem;margin-top:0.03rem">分享</div>
            </div>
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

<style>
.feidian_row{
    height:auto;display:inline-block;margin:20px 0px;background:#fff;
}
.feidian_row .row_header{
    height:0.5rem;line-height:0.5rem;width:100%;font-size:0.14rem;padding:0px 0.1rem;
}
.feidian_row .row_content{
    padding:0px 10px;margin-bottom:0.2rem
}
.feidian_row .row_footer{
    color:#ccc;font-size:0.12rem;border-top:1px solid #efefef;
}
</style>
