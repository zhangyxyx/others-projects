<template>
<div class="main">
    <!--顶部搜索框和选项-->
    <div class="top">
        <div class="top-one">
            <span style="margin:5px 0px 0px 20px">黄浦区人民广场上</span>
        </div>
        <div class="top-two">
            <input type="text" placeholder="搜索商家、商品">
        </div>
        <div class="top-three">
            <div class="swiper-container1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in topThree" :key="index">{{item.name}}</div>
                   
                </div>
               
            </div>
        </div>
    </div>
    <!--各种选项-->
    <div class="tab">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" >
                    <div style="height:2rem;">
                        <div class="swiper_every tabOne1" v-for="(item,index) in tabOne1" :key="index" v-on:click="clickList(item.icon)">
                            <img :src="item.img">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                    <div style="height:2rem;">
                        <div class="swiper_every tabOne2" v-for="(item,index) in tabOne2" :key="index">
                            <img :src="item.img">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide" >
                   <div style="height:2rem;">
                        <div class="swiper_every" v-for="(item,index) in tabTwo1" :key="index">
                            <img :src="item.img">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                    <div style="height:2rem;">
                        <div class="swiper_every" v-for="(item,index) in tabTwo2" :key="index">
                            <img :src="item.img">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>

    </div>
    <!--推荐商家-->
    <h3 class="groomtitle">推荐商家</h3>
    <div class="groom">
        <div class="groomEvery" v-for="(data,index) in homelists" :key="index">
            <div style="width:20%;float:left;"><img :src="data.img"></div>
            <div style="width:80%;float:left;">
                <h4>{{data.title}}</h4>
                <p>销量：{{data.sales}}</p>
                <p>价格：{{data.price}}</p>
                <p>优惠：{{data.priceOff}}</p>
            </div>
        </div>
        
    </div>
    <div class="tip">滑动加载更多</div>
    <myBottom v-bind:message="parentMsg"></myBottom>
</div>  
</template>
<script>
import swiper from './swiper.js'
import common from '../common.vue'
export default {
    data(){
        return{
            parentMsg:'takeout',
            homelists:[],
            topThree:[
                {name:'烧卖',icon:'sm'},
                {name:'榴莲披萨',icon:'ll'},
                {name:'牛奶棚',icon:'nn'},
                {name:'水果5折',icon:'sg'},
                {name:'我的菜',icon:'wd'},
                {name:'烧鸡',icon:'sj'},
                {name:'壹杯鲁肉饭',icon:''},
                {name:'吐司',icon:'ts'},
                {name:'红唇串串香',icon:'hc'},
                {name:'肉包',icon:'rb'},
            ],
            tabOne1:[
                {name:'美食',icon:'ms',img:'http://fuss10.elemecdn.com/b/7e/d1890cf73ae6f2adb97caa39de7fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'甜品饮品',icon:'',img:'http://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'商超便利',icon:'',img:'http://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'预定早餐',icon:'',img:'http://fuss10.elemecdn.com/d/49/7757ff22e8ab28e7dfa5f7e2c2692jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
               
            ],
            tabOne2:[
                {name:'果蔬生鲜',icon:'',img:'http://fuss10.elemecdn.com/c/db/d20d49e5029281b9b73db1c5ec6f9jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'新店特惠',icon:'',img:'http://fuss10.elemecdn.com/a/fa/d41b04d520d445dc5de42dae9a384jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'准时达',icon:'',img:'http://fuss10.elemecdn.com/3/84/8e031bf7b3c036b4ec19edff16e46jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'早餐',icon:'',img:'http://fuss10.elemecdn.com/1/48/bf1a859bf81553bbcfd6cf4ac42cbjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
            ],
            tabTwo1:[
                {name:'帮买帮卖',icon:'ms',img:'http://fuss10.elemecdn.com/1/c1/dfade1a31f312f161074c3dd6a89cjpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'汉堡薯条',icon:'',img:'http://fuss10.elemecdn.com/b/7f/432619fb21a40b05cd25d11eca02djpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'包子粥店',icon:'',img:'http://fuss10.elemecdn.com/2/17/244241b514affc0f12f4168cf6628jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'鲜花蛋糕',icon:'',img:'http://fuss10.elemecdn.com/8/83/171fd98b85dee3b3f4243b7459b48jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
               
            ],
             tabTwo2:[
                {name:'麻辣烫',icon:'',img:'http://fuss10.elemecdn.com/3/c7/a9ef469a12e7a596b559145b87f09jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'川湘菜',icon:'',img:'http://fuss10.elemecdn.com/9/7c/9700836a33e05c2410bda8da59117jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'披萨意面',icon:'',img:'http://fuss10.elemecdn.com/7/b6/235761e50d391445f021922b71789jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
                {name:'异国料理',icon:'',img:'http://fuss10.elemecdn.com/6/d2/de0683a49a0655c728b70fdb344d5jpeg.jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/'},
            
             ],
            
        }
    },
    components:{
        'myBottom':common
    },
    mounted:function(){
        this.sums();
        this.scrollData();
        this.swippertab();
    },
    methods:{
        //点击调转页面
        clickList(icon){
            console.log(icon)
            this.$router.push("/takeout/"+icon)
        },
        //初始化swipper插件
        swippertab(){
            var swiper1 = new Swiper('.swiper-container1', {
                pagination: '.swiper-pagination',
                slidesPerView: 7,
                paginationClickable: true,
               
            });
            var swiper2 = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 1,
                paginationClickable: true,
              
            });
        },
        //鼠标滑动的时候渲染数据
        scrollData(){
            var n=0;
            var _this=this;
            $(window).scroll(function(){
                var Aheight=$(".main").height();//总高度
                var Bheight=$(window).height();//可视区高度
                var Cheight=$(window).scrollTop();//滚动
                if(Cheight==Aheight-Bheight){
                    n++;
                    console.log(n);
                    var params={
                        page:n,
                        limit:5
                    };
                    _this.showlist(params);
                }
            })
        },
        //渲染数据
        showlist(params){
            var _this=this;
            this. sumpage=[];
            this.$http.post('/api/list/showlist',params).then((response)=>{
                //列表数据
                var result=JSON.parse(response.bodyText).data;
                //数据的总数量
                var sum=JSON.parse(response.bodyText).sum;
                if(result&&result.length>0){
                    for(var i=0;i<result.length;i++){
                        _this.homelists.push(result[i]);
                    }
                    return _this.homelists[0];
                }else{
                    $(".tip").text('已经加载完毕')
                }
                
			});
        },
        //渲染列表
        sums(){
			var _this=this;
            var params={
                page:0,
                limit:5
            };
			this.showlist(params);
		},
    }
}
</script>
<style scoped>
@import './swiper.css';
</style>
<style>
.top{
    height:2.43rem;
    background:#0085ff;
    color:#fff;
}
.top-one{height:0.69rem;}
.top-one span{font-size:0.34rem;float:left;}
.top-two{text-align:center;}
.top-two input{
    width:90%;height:0.72rem;
    line-height:0.72rem;text-align:center;
    border-radius:50px;
    margin:0 auto;
} 
.tab{
    height:3.54rem;
    background:#fff;
    margin-bottom:20px;
}
.groomtitle{
    padding-left:0.2rem;height:70px;
    line-height:70px;margin:0px;font-size:0.2rem;
    font-weight:bold;
}
.groomEvery{
    height:2rem;
    padding:0.1rem;
}
/*顶部滑动*/
.top-three{
    margin-top:40px;
}
.top-three .swiper-container1 {
    height:28px;
    width: 100%;
}
.top-three .swiper-slide1 {
text-align: center;
font-size: 0.14rem;
display: -webkit-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
-webkit-box-pack: center;
-ms-flex-pack: center;
-webkit-justify-content: center;
justify-content: center;
-webkit-box-align: center;
-ms-flex-align: center;
-webkit-align-items: center;
align-items: center;
}
/*选项卡*/
.swiper-container {
width: 100%;
height: 100%;
}
.swiper-slide {
text-align: center;
font-size: 18px;
display: -webkit-box;
display: -ms-flexbox;
display: -webkit-flex;
display: flex;
-webkit-box-pack: center;
-ms-flex-pack: center;
-webkit-justify-content: center;
justify-content: center;
-webkit-box-align: center;
-ms-flex-align: center;
-webkit-align-items: center;
align-items: center;
}
.swiper_every{
width:1.87rem;
height:1.27rem;
floaT:left;
}
.tip{
    height:0.5rem;
    width:100%;
    background:#fff;
    line-height:0.5rem;
    text-align:center;
    font-size:0.2rem;
}
</style>
