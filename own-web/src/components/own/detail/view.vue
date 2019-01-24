<template>
<div>
   <mycommon v-bind:message="parentMag"></mycommon>
   {{$route.params.id}}
</div>
</template>

<script>
import common from '@/components/owncommon'
export default{
    data(){
        return{
            parentMag:'home',
        }
    },
    components:{
        'mycommon':common
    },
    methods:{
        
    }
}
</script>