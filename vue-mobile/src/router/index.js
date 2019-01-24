import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//home
import home from '@/components/home/home'
import feidian from '@/components/feidian/feidian'
import search from '@/components/search/search'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'/feidian',
      name:'feidian',
      component:feidian
    },
    {
      path:'/search',
      name:'search',
      component:search
    }
  ]
})
