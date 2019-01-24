<template>
<div class="row">
    <mycommon v-bind:message="parentMsg"></mycommon>
    <h3 style="margin:20px 0px">向我留言</h3>
     <!--添加的-->
	<div class="addlist" style="height:120px;">
		<label>姓名：</label><input type="text" v-model="list.name"/>	</br>	
		<label>标题：</label><input type="text" v-model="list.title"/>	</br>	
		<label>内容：</label><input type="text" v-model="list.con"/></br>
		<button @click="addlist">提交</button>
	</div> 
    <h4 style="margin-top:20px;height:30px;">留言列表</h4>
    <div class="seeklist" >
        <div class="seekevery" v-for="(item,index) in showData" :key="index">
            <h3>{{item.title}}</h3>
            <div ><span>{{item.name}}</span><span>{{item.time}}</span></div>
            <p>{{item.con}}</p>
        </div>
    </div>
   
     <!--图片操作-->
    <!--<div style="margin-top:30px;">
            <div class="img">
                <form id="form1" enctype="multipart/form-data" method="post" action=""> 
                    <input type="file" :accpet="accpets" id="fileToUpload" @change="upload">
                 
                </form>
            </div>
            <img id="changeimg" src="" style="width:300px;height:300px">
    </div>-->
</div>
</template>
<script>
import common from '../owncommon.vue'
export default{
    data(){
        return{
            parentMsg:'seek',
            list:{
                name:'',
                title:'',
                con:'',
                img:''
            }, 
            accpets:{
                type:String,
                default:'image/jpeg,image/jpg,image/png,image/gif'
            }	,
            flag:[String,Number],
            maxSize:{
                type:Number,
                default:0
            },
            showData:[]
        }
    },
   components:{
       'mycommon':common
   },
   mounted:function(){
       this.showlist();
   },
     methods:{
        showlist(){
            this.$http.get('/api/seek/showlist').then((response)=>{
                var result=JSON.parse(response.bodyText);
                console.log(result)
                this.showData=result;
            })
        },
         //添加列表
		addlist(){
            //设置一下时间
            var year=new Date().getFullYear();
            var month=new Date().getMonth();//月
            var date=new Date().getDate();//日
            var hour=new Date().getHours();//小时
            var min=new Date().getMinutes();//分钟
            var sec=new Date().getSeconds();//秒
            var time=year+"/"+(month+1)+"/"+date+"/"+hour+":"+min+":"+sec;
            //图片
            // var imgfile=e.target.files[0];
            // var fromData=new FormData();
            // fromData.append('file',imgfile);

			let params = { 
                name:this.list.name,
                title : this.list.title,
                time : time,
				con:this.list.con,
            };
            
			this.$http.post('/api/seek/addlist',params).then((response)=>{
                this.showlist();
                //重置提交表单
               
            });
            $("input").val('');
		},
        //上传图片
        upload () {
                //获取数据
                var files = document.getElementById('fileToUpload').files;
                var file = event.target.files[0];
                //转成base64
                var img='';
                var reader=new FileReader();
               
                reader.onload=function(e){
                    document.getElementById("changeimg").src=e.target.result//预先显示图片   
                    //上传的过程
                    var params={
                            img:this.result
                    }
                    _this.$http.post('/api/file/addfile',params).then((response)=>{
                        console.log(response)  
                    }) 
                }
                reader.readAsDataURL(file);

                //直接用formData
                var formData = new FormData(file);
                formData.append('file',file);
                
            }, 
        //显示图片
        showfile(){
            this.$http.get('/api/file/showfile').then((response)=>{
                console.log(response)
            })
        },
    }
}
</script>
<style>
.seekevery h3{
    margin-left:10px;
}
.seekevery{
    border:1px solid #fff;
    margin:10px 0px;
    background:#fff;
    padding:0px 10px;
}
.seekevery div{
    height:40px;
    line-height:40px;
    border-left:3px solid #efefef;
    padding-left:10px;
    margin-bottom:10px;
}
.seekevery p{
    margin-left:10px;
}
.seekevery span{
  displaY:block;
  width:200px;
  floaT:left;
}
</style>