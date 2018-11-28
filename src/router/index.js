import Vue from 'vue'
import Router from 'vue-router'
// 引入login组件
import Login from '@/components/login/login.vue'
// 引入首页
import Home from '@/components/home/home.vue'
// 引入用户
import User from '@/components/user/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
     path:'/login',
     name:'login',
     component:Login
    },
    {
      path:'/',
      name:'home',
      component:Home,
      children:[
        {path:'/user',name:'user',component:User}
      ]
    }
  ]
})
