import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

//own
import own from '@/components/own/view'
import article from '@/components/article/view'
import skill from '@/components/skill/view'

import concat from '@/components/concat/view'
import seek from '@/components/seek/view'

import detail from '@/components/own/detail/view'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Login',
    //   component: Login
    // },
    //个人
    {//个人首页
      path:'/',
      redirect: '/own/home',
      name:'own',
      component:own
    },
    {//个人首页
      path: '/own/home',
      name:'own',
      component:own
    },
    {//文章
      path:'/own/article',
      name:'article',
      component:article,
    },
    {//技能
      path:'/own/skill',
      name:'skill',
      component:skill
    },
    
    {//联系我
      path:'/own/concat',
      name:'concat',
      component:concat
    },
    {//联系我
      path:'/own/seek',
      name:'seek',
      component:seek
    },
    {//详情
      path:'/own/detail/view',
      name:detail,
      component:detail
    }
   
  ]
})
