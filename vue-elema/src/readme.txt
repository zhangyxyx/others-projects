2017-6-23
1.common.vue是公共的部分 就是顶部的菜单
这个部分应应用于主页面的home，就是打开网站一开始的时候，home相当于首页，首页需要引入common.vue这个组件
在顶部有几个菜单
zhuanlan collect see label这几个菜单 这几个菜单是点击链接需要跳转 跳转的话需要在router上面进行设置（如果只是把这几个当做引入的组件的话。那么刷新页面会回到起始状态）

node针对mongoose的操作：
1.
const mongoose=require('mongoose')
链接mongoodb
mongoose.concat('mongodb://localhost/test')
实例化链接对象
const db=mongoose.connection
db.on('error',console.err.bind(const,'链接错误'))
db.once('open',(callback)=>{
    console.log('链接成功')
})
创建schema
const classSchema=new mongoose.Schema({
    name:String,
    student:String
})
创建model
const classModel=mongoose.model('newClass',classSchema)
model.exports=classModel

2.创建接口
const classModel=require('../modules/my_class')
const routes=(app)=>{
    app.get('/',(req,res,next)=>{

    })
}

在这个项目中用的是express这个框架，所以有必要认识一下express是什么东西
是基于nodejs平台快速开放极简的web开发框架
express是建立在nodejs内置的http模块上的，http模块生成服务器的原始代码是
var htpp=require('http');
var app=htttp.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'})
    response.end('hello world')
});
app.listen(3000,'localhost')
这是http模块的createServer方法，表示生成一个htttp服务器实例，该方法接收
一个回调函数，该回调函数的参数，分别表示http请求和http回应的request和response
express的写法是
var express=require('express')
var app=express();
app.get('/',function(req,res){
    res.send('hello world!')
})
app.listen(3000);
原来是用http.createserver方法新建一个app实例，现在则使用express的构造方法，生成一个express实例，
两者的回调函数是相同的.express框架等于在http模块之上，加一个中间层

3.什么是中间件
中间件就是处理http请求的函数，他最大的特点就是，一个中间件处理完，在传递给下一个中间件，app实例在运行过程中
会调用一系列的中间件
每个中间件可以从app实例，接收三个参数，依次是request对象（代表http请求） response对象（代表http回应） 
next回调函数（代表下一个中间件） 每个中间件可以对http请求进行加工，兵器决定是否调用next方法，将request
对象在传给下一个中间件

4.use方法
ues是express注册中间件的方法，它返回一个函数
var express=require('express')
var htpp=require('http');
var app=express();
app.use(function(request,response,next){
    console.log('in comes a'+request.method+"to"+request.url)
    next();
})
app.use(function(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.end('hello world')
});
http.createserver(app).listen(1337)
app.use注册了两个中间件，收到http请求之后，先调用第一个中间件，在控制台输出一行信息，然后
通过next方法，将执行权传给第二个中间件，输出http回应，由于第二个中间件没有低矮用next方法，
所以request对象不再向后传递了
use方法内部可以对访问路径进行判断，据此就能实现简单的路由，根据不同的请求网址，返回不同的网页内容
var express=require('express')
var http=require('http')
var app=express()
qpp.ues(function(request,response,next){
    if(request.url=="/"){
        response.writeHead(200,{"Content-Type":"text/plain"})
        response.end("welcome to the home")
    }else{
        next();
    }
})
app.use(function(request,response,nex){
    if(request.url=="/about"){
        response.writeHead(200,{"Content-Type":"text/plain"})
    }else{
        next();
    }
})
app.use(function(request,response){
    response.writeHead(404,{"Content-Type":"text/plain"});
    response.end("404")
})
http.createServer(app).listen(1337)
通过request.url属性，判断请求的网址，从而返回不同的内容，注意，app.use方法一共登记了三个中间件
只要请求路径匹配，就不会将执行权交给下一个中间件，因此，最后一个中间件会返回404错误，就是前面的
中间件都没有匹配请求路径，找不到所要请求的资源
除了在回调函数内部判断请求的网址，use方法也允许将请求网址写在第一个参数，这代表，只有请求路径匹配这个参数
后面的中间件才会生效
app.use('/path',someMiddleware);
上面的代码支队根目录有请求，调用某个中间件
var express=require('express')
var http=require('http')
var app=express();
app.use('/home',function(request,response,next){
    response.writeHead(200,{"Content-Type":"text/plain"})
    response.next("welcome to")
})
app.use("/about",function(request,response,next){
    response.writeHead(200,{"Content-Type":"text/plain"})
    response.end("welcome to ")
})
app.use(function(request,response){
    response.writeHead(404,{"Content-Type":"text/plain"})
    response.end("404")
})
http.createServer(app).listen(1337)

4.express-all方法和http动词方法
针对不用的请求，express提供了use方法的一些别名
var express=require('express')
var http=require('http')
var app=express();
app.all('*',function(request,response,next){
    response.writeHead(200,{"Content-Type":"text/plain"})
    next();
})
app.get("/",function(request,response){
    response.end("welcome to the home")
})
app.get('/about',function(request,response){
    response.end("welcome to the about page")
})
app.get('*',function(request,response){
    response.end('404')
})
http.createServer(app).listen(1337)
all方法表示 所有请求都必须通过该中间件，参数中的*表示对所有路径有效
get方法则是只有get动词的http请求通过该中间件，它的第一个参数是请求的
路径，由于get方法的回调函数没有调用next方法，所以只要有一个中间件
被调用了，后面的中间件就不会再被调用了
除了get方法，express还提供了post put delete方法，就是http动词都是express方法
这些方法的第一个参数都是请求的路径，除了绝对匹配以外，express允许模式匹配
app.get('/hello/:who',function(req,res){
    res.end("hello"+req.params.who+".")
})
上面匹配/hello/alice网址，网址中的alice将被捕获，作为req.params.who属性的值，需要注意
的是，捕获后需要对网址进行检查，过滤不安全字符，上面的写法只是为了演示，生产中不应该直接
使用用户提供的值
如果在模式参数后面加上问号，表示改参数可选。
app.get('/hello/:who?',function(req,res){
    if(req.params.id){
        res.end('hello'+req.params.who+".")
    }else{
        res.send("hello guest")
    }
})
下面还有一个更加复杂的例子
app.get('/from/"fid/thread/:tid',middleware)
//匹配/commits/71dbb9c
//或/commots/71dnn9c
app.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/,function(req,res){
    var from=req.params[0];
    var to:req.params[1]||'HEAD';
    res.send('commit range'+from+".."+to);
});

5.express-set方法
se方法用来指定变量的值
app.set("views",_dirname+"/views")
app.set("view engine","jade")

6.response对象
（1）response.redirect方法
response.redirect方法允许网址的重定向
（2）responsesendFile方法
用于发送文件
（3）response.render方法
用于渲染网页模板
7.request对象
request.ip用于获取http请求的ip地址
request.files用于获取上传的文件
8.搭建https服务器
使用express搭建https加密服务器
var fs=require('fs');
var options={
    key:fs.readFileSync('E:/ssl/myserver.key'),
    cert:fs.readFileSync('E:/ssl/myserver.crt'),
    passphrase:'1234'
}
var http=require('https');
var express=require('express')
var app=express();
app.get('/',function(req,res){
    res.send('hello world')
})
var server=https.createServer(options,app)
server.listen(8084)
console.log('server is running on port 8084')

9.express。router用法
从expres4.0用法，路由器功能成了一个单独的组件express.router 好像是一个小型的express应用程序
用自己的use get params route
(1)基本用法
express.router是一个构造函数，调用后返回一个路由器实例，然后，使用该实例的http动词方法，为不同的访问路径，指定回调函数 最后挂载到某个路径
var router=express.Router();
router.get('/',function(req,res){
    res.send('首页')
})
router.get('/about',function(req,res){
    res.send('关于')
})
app.use('/',router)
(2)router.route方法
router实例对象的route方法，可以接收访问路径作为参数
var router=express.Router();
router.route('/api')/post(function(req,res){

}).get(function(req,res){
    Bear.find(function(err,bears){
        if(err)res.send(err);
        res.json(bears);
    })
})
app.use('/',routers)
(3)router中间件
use方法未router对象指定中间件，就是在数据证实发给用户之前，对数据进行处理。下面就是一个中间件的例子
router.use(function(req,res,next){
    console.log(req.method,req,url)
    next();
})
回调函数的next参数，表示接收其他中间件的调用，函数体重的next()表示将数据传递给下一个中间件
注意：中间件的放置顺序很重要，等同于执行顺序，而且中间件必须放在http东西方法之前，否则不会执行
（4）对路径参数的处理
router对象的params方法用于路径参数的处理
router.params('name',function(req,res,next,name){
    console.log(name);
    req.name=name;
    next();
})
router.get('/hello/name',function(req,res){
    res.send('hello'+req.name+"!")
})
get方法未访问路径制定了name参数 params方法则是对name参数进行处理，注意，params方法必须放在http动词方法之前
（5）app.route
app是express的实例对象，express为改对象提供了route属性。app.route实际上是express.router的缩写形式，因此对同一个路径指定
get post的回调函数 可以写成链式形式
app.route('/login').get(function(req,res){
    res.send('this is the login form')
}).post(function(req,res){
    console.log('procing');
    res.send('processing ths login form')
})

10 上传文件
网页中上传文件的表单
<form action="/picture/upload" method="POST" enctype="multipart/form-data">
    select
    <input type="file" name="image">
    <input type="submit" value="upload Image">
</form>
然后服务器脚本建立指向/upload目录的路由。这时可以安装multer模块，它提供了上传文件的
许多功能
var express=require('express')
var router=require.Router();
var multer=require('multer')
var uploading=multer({
    dest:__dirname+'../public/uploads/',
    limits:{fileSize:10000,files:1}
})
router.post('/upload',uploading,function(req,res){
})
module.exports=router
这时上传到本地目录的。
下面是上传到Amazon S3



