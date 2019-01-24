<template>
<div class="main">
    <myBottom v-bind:message="parentMsg"></myBottom>
</div>  
</template>

<script>
import common from '../common.vue'
export default {
    data(){
        return{
            parentMsg:'me'
        }
    },
    components:{
        'myBottom':common
    }
}
</script>

<style>
  
</style>
