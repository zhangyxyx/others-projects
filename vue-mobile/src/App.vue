<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted:function(){
    this.computedRem()
  },
  methods:{
    computedRem(){
      (function(doc, win) {
              var docEl = doc.documentElement,
              resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
              recalc = function() {
                  var clientWidth = docEl.clientWidth;
                  if (!clientWidth) return;
                  if (clientWidth >= 375) { //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
                      docEl.style.fontSize = '100px';
                  } else {
                      docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'; //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
                  }
              };
      
          if (!doc.addEventListener) return;
          //浏览器宽度高度变化的时候
          win.addEventListener(resizeEvt, recalc, false);
          //浏览器开始渲染的时候
          doc.addEventListener('DOMContentLoaded', recalc, false);
      })(document, window);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/*默认样式*/
body, ul, ol, li, p, h1, h2, h3, h4, h5, h6, form, fieldset, table, td, img, div, dl, dt, dd, input { margin: 0; padding: 0; border: 0; }
body { font-size: 14px; font-family: '\65B0\5B8B\4F53', '\5B8B\4F53', Verdana; background:#f5f5f5;}
ul, ol { list-style-type: none; }
select, input, img { vertical-align: middle; outline: none; }
a { text-decoration: none; outline: none; blr:expression(this.onFocus=this.blur()) }

html { overflow-x: hidden; }
.clearfix:after { content: ""; display: block; clear: both; }
.clearfix { zoom: 1; }

</style>
