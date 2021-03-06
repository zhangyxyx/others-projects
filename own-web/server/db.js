// Schema、Model、Entity或者Documents的关系请牢记，
//Schema生成Model，Model创造Entity，
//Model和Entity都可对数据库操作造成影响，
//但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/ownWeb');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

/************** 定义模型Model **************/


/************** 定义模式loginSchema **************/

//列表的模式
const listSchema=mongoose.Schema({
	title:String,
    author:String,
    watch:String,
    watch:String,
    time:String,
    con:String
});
//文件
const fileSchema=mongoose.Schema({
    url:String
});


//留言
const seekSchma=mongoose.Schema({
    name:String,
    title:String,
    time:String,
    con:String
})
const Models = {
    list:mongoose.model('list',listSchema),
    seek:mongoose.model('seek',seekSchma)
}
module.exports = Models;