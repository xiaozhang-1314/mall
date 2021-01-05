import Vue from "vue";
import Router from "vue-router";
// import Login from './views/login/index.vue'
//  下面情况，默认的会导入 ./views/login 目录下的index.vue组件
import Login from './views/login'
import Layout from '@/components/Layout.vue'
import Home from '@/views/home'
import Article from '@/views/article'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Settings from '@/views/settings'
import Fans from "@/views/fans"
import Comment from '@/views/comment'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login', //路由名称 路由的名字可以方便直接动态导航到目标页
      component: Login //组件对象
    },
    {
    //  name: 'layout', //有默认子路由名字   父路由就没有必要起名字
      path: '/',
      component: Layout, //组件对象
      redirect:'/home', //重定向
      children:[
        {
          path:'/',
          name: 'home',
          component: Home 
        }
      ]
    },  
    {
      path: '/article',
      component:Layout,
      children:[
        {
          path: '/',
          component: Article,
        }
      ]
    },
    {
      path: '/image',
      component:Layout,
      children:[
        {
          path: '/',
          component: Image,
        }
      ]
    },
    {
      path: '/publish',
      component:Layout,
      children:[
        {
          path: '/',
          component: Publish,
        }
      ]
    },
    {
      path: '/settings',
      component:Layout,
      children:[
        {
          path: '/',
          component: Settings,
        }
      ]
    },
    {
      path: '/fans',
      component:Layout,
      children:[
        {
          path: '/',
          component: Fans,
        }
      ]
    },
    {
      path: '/comment',
      component:Layout,
      children:[
        {
          path: '/',
          component: Comment,
        }
      ]
    }
  ]
})
