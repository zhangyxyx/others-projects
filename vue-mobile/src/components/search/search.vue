<template>
<div class="search">
    <!--头部-->
    <headerComponent></headerComponent>
    <!--内容-->
    <div>
        <rowsComponent></rowsComponent>
    </div>
    <!--尾部-->
    <footerComponent></footerComponent>
</div>
</template>


<script>
import headerViews from './header.vue'
import rowViews from './rows.vue'
import footerViews from '../common/footer.vue'
export default {
    data(){
        return{}
    },
    components:{
        "headerComponent":headerViews,
        "footerComponent":footerViews,
        "rowsComponent":rowViews
    }
}
</script>

<style>

</style>
