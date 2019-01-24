import Vue from 'vue'
import Router from 'vue-router'

import takeout from '@/components/takeout/view'
//从首页连接过去的页面
import ms from '@/components/takeout/ms/view'

import find from '@/components/find/view'
import goods from '@/components/goods/view'
import me from '@/components/me/view'
import addData from '@/components/addData'


Vue.use(Router)

export default new Router({
  routes: [
   //外卖 也就是一开始的主页面
   {
      path:'/takeout',
      component:takeout,
   },
   //美食
   {
      path:'/takeout/ms',
      component:ms,
   },
   //发现
   {
     path:'/find',
     component:find
   },
   //订单
   {
     path:'/goods',
     component:goods
   },
   //我的
   {
     path:'/me',
     component:me
   },
   //添加信息
   {
     path:'/addData',
     component:addData
   }
  ]
})
