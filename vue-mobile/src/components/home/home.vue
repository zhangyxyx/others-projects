<template>
<div class="home">
    <!--顶部-->
    <headerComponent></headerComponent>
    <!--内容-->
    <rowsComponent></rowsComponent>
    <!--尾部-->
    <footerComponent></footerComponent>
</div>
</template>

<script>
import headerViews from './header.vue'
import footerViews from '../common/footer.vue'
import rowsViews from './rows.vue'
export default {
    data(){
        return{}
    },
    components:{
        "headerComponent":headerViews,
        'footerComponent':footerViews,
        'rowsComponent':rowsViews
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.home{
    width:100%;height:0.4rem;background:#0066FF;
   
}

</style>

