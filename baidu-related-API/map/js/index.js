$(function(){
	//第三部分
	$(".con .row div").mouseenter(function(){
		$(this).find("p").css("display","block");
	}).mouseleave(function(){
		$(this).find("p").css("display","none");
	});
	//队伍
	$(".team_every").hover(function(){
		$(".team_every").removeClass("every_active");
		$(this).addClass("every_active");
	});
	//第四部分
	$(".box .row").mouseenter(function(){
		$(this).find(".font").css({"background":"#ff504e"});
		$(this).find(".font").css({"color":"#fff"});
	}).mouseleave(function(){
		$(this).find(".font").css({"background":"#fff"});
		$(this).find(".font").css({"color":"#000"});
	});
});