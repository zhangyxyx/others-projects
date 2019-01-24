/*真正的mainjs应该是
（1）实现js文件的异步加载，避免网页失去响应；
（2）管理模块之间的依赖性，便于代码的编写和维护
1.require(['modules1,modules2,modules3'],function(m1,m2,m3){主模块依赖这三个模块
        第一个参数是依赖的模块；第二个参数是回调函数 当模块依赖成功之后执行的函数....
   require()异步加载moduleA，moduleB和moduleC，浏览器不会失去响应；
    它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。
});
2.require.config()对模块的加载行为进行自定义 写在mainjs中 也可以写在js文件中 然后引入到mainjs中参数是一个对象
require.config({
	第一种写法
	paths:{
		"名称"："路径"
		"jquery":"js/jquery.js"
	}
	另一种写法：
	baseUrl:'js/lib';
	paths:{
		"jquery":"jquery.js"
	}
	shim专门用来配置不兼容的模块
	每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。
	
})
3.require采用的是amd形式的 所以模块必须用defined定义
defined(["jquery"],function(){
	alert(1);
});
*/
require.config({
	paths:{
		"jquery":"jquery-1.7.2",
	}
});
require(["jquery"],function(jq){
	alert(1);
});
