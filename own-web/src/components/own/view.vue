<template>
<div class="row">
    <mycommon v-bind:message="parentMag"></mycommon>
     <div class="main-con">
		<div class="home-every" v-for="(item,index) in homelists" :key="index">
			<router-link :to="{name:'detail',params:{id:item._id}}">
                <h3 >{{item.title}}</h3>
                <div style="height:30px;line-height:30px;">
                    <p><span><img src="static/time.png"></span>{{item.time}}</p>
                    <p><span><img src="static/sort.png"></span>{{item.sort==1?"文章":"随笔"}}</p>
                    <p><span><img src="static/user.png"></span>{{item.author}}</p>
                </div>
                <div style="margin-top:15px;">{{item.con}}</div>
            </router-link>
		</div>
	</div>
</div>
</template>

<script>
import $ from 'jquery'
import common from '../owncommon.vue'
export default {
    data(){
        return{
            parentMag:'home',
            homelists:[] ,
        }
    },
    components:{
        'mycommon':common
    },
    mounted:function () {
        //类似于jquery中的ready方法

        this.sums();
        
    },
	methods:{
		//切换左边的菜单
		clickmenu(menu){
			$(".rightevery").eq(menu).css({display:"block"}).siblings().css({display:"none"})
		},
			 //渲染数据
        showlist(params){
            var _this=this;
            _this.sumpage=[];
            this.$http.post('/api/list/showlist',params).then((response)=>{
                //列表数据
                var result=JSON.parse(response.bodyText).data;
                console.log(result)
                //数据的总数量
                var sum=JSON.parse(response.bodyText).sum;
                //渲染出页码
                $(".fenye .page").empty();
                
                for(var i=0;i<Math.ceil(sum/params.limit);i++){
                    _this.sumpage.push(i);
                }
				//将结果赋值给需要循环
				_this.homelists=result;
				return _this.homelists;
			}).then(function(){
                _this.mouse();
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
        mouse(){
            $(".home-every").mouseover(function(){
                $(this).css({"border":"1px solid #8bc7fb"})
            }).mouseout(function(){
                $(this).css({"border":"1px solid #fff"})
            })
        },
        //点击进入详情页面
       
	}

    
}
</script>

<style>
/*内容*/
.main-con{
    width:1170px;
    background:#fff;
}
/*每个数据的模板*/
.home-every{
    height:200px;
    padding:10px;
    box-shadow:0px 0px 5px rgba(0,0,0,.2);
    margin:10px 0px;
    cursor:pointer;

}
.home-every p{
    floaT:left;
    margin:0px;
    margin-right:15px;
}
.home-every span{
    width:20px;
    height:20px;
    displaY:block;
    floaT:left;
    margin-right:3px;
}
.home-every span img{
    width:100%;
    height:100%;

}
</style>
