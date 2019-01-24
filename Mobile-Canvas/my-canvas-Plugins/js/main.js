$(function(){
    $.fn.extend({
        rect:function(json){
            var c=document.getElementById(this[0].id);
            var ctx=c.getContext("2d");//矩形;
            ctx.beginPath();
            ctx.fillStyle=json.color;
            ctx.fillRect(json.x,json.y,json.w,json.h);
            ctx.closePath();
        },
        ellipse:function(json){
            console.log(json)
            var c=document.getElementById(this[0].id);
            var cEill=c.getContext('2d');//圆形
            cEill.beginPath();
            cEill.fillStyle=json.color;
            cEill.arc(json.x,json.y,json.r,json.start,json.end);
            cEill.fill();
            cEill.closePath();
        },
        path:function(json){
            var c=document.getElementById(this[0].id);
            var cLine=c.getContext('2d');//线段
            cLine.beginPath();
            cLine.fillStyle=json.color;
            cLine.moveTo(json.m.x,json.m.y);
            for(var i=0;i<json.l.length;i++){
                cLine.lineTo(json.l[i].x,json.l[i].y);
            }
            cLine.fill();
            cLine.closePath();
        },
    })
})