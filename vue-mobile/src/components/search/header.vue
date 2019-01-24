<template>
<div class="search_header">
    <div class="header_con">
        <input type="text" placeholder="搜索"/>
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
//@import '../../style/mixin';
.search_header .header_con{
    height:0.4rem;
    line-height:0.4rem;
    background:#0066FF;width:100%;
}
.search_header .header_con input{
   width:94%;margin-left:2%;margin-right:2%;padding:0px 5px;
}

</style>

