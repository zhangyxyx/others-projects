<template>
<div class="main">
    <div class="mstop">
       <router-link to="/takeout" ><div ><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>返回</div></router-link>
       美食
    </div>
    <div class="mstab">
        <div class="tab_one" >
            <ul >
                <li v-on:click="clickTab('分类')">分类<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span></li>
                <transition name="fade">
                    <ul v-if="showOne">
                        <li v-for="(item,index) in shopsone" :key="index"> {{item.name}} </li>
                    </ul>
                </transition>              
            </ul>
        </div>
        <div class="tab_one">
            <li v-on:click="clickTab('排序')">智能排序<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span></li>
            <transition name="fade">
                <ul v-if="showTwo">
                    <li v-for="(item,index) in shopstwo" :key="index"> {{item.name}} </li>
                </ul>
            </transition>
        </div>
        <div class="tab_one">
             <li v-on:click="clickTab('删选')">删选<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span></li>
            <transition name="fade">
                <ul v-if="showThree">
                    <li v-for="(item,index) in shopsthree" :key="index"> {{item.name}} </li>
                </ul>
            </transition>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            shopsone:[
                {name:'全部商家'},
                {name:'美食'},
                {name:'快餐便当'},
                {name:'特色菜系'},
                {name:'异国料理'},
                {name:'小吃夜宵'},
                {name:'甜品饮品'},
                {name:'果蔬生鲜'},
            ],
            shopstwo:[
                {name:'智能排序'},
                {name:'距离最近'},
                {name:'销量最高'},
                {name:'起送价最低'},
                {name:'配送速度最快'},
                {name:'评分最高'},
            ],
            showOne:false,
            showTwo:false,
            showThree:false
        }
    },
    methods:{
        clickTab(icon){
            switch(icon){
                case '分类':
                this.showOne=!this.showOne
                break;
                case '排序':
                this.showTwo=!this.showTwo
                break;
                case '删选':
                this.showThree=!this.showThree
                break;
            }
            // this.show=!this.show
        }
    }
}
</script>

<style>
ul,li{
    list-style-type: none;
    padding:0px;
}
.mstop{
    height:0.87rem;
    line-height:0.87rem;
    text-align:center;
    font-size:0.2rem;
    background:#2395ff;
    position:relative;
} 
.mstop div{
    position:absolute;
    left:20px;
    font-size:0.3rem;
}
.tab_one{
    width:2.5rem;
    height:0.79rem;
    float:left;
    text-align:center;
    line-height:0.79rem;
} 
.fade-enter-active,.fade-leave-active{
    transition:opacity .5s
}
.fade-enter,.fade-leave-to{
    opacity:0
}

</style>
