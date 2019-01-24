define(['./jquery.js'],function(jquery){
	var len=$(".head-left a").length;
	for(var i=0;i<len;i++){
		(function(index){
			$(".head-left a").eq(index).hover(function(){
				$(".head-left a").eq(index).css('background',"#095fb3").siblings().css('background',"#0767c8");
			})
		})(i);
		
	}
	
})