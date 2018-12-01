import Vue from 'vue'
import Router from 'vue-router'
// 引入login组件
import Login from '@/components/login/login.vue'
// 引入首页
import Home from '@/components/home/home.vue'
// 引入用户
import User from '@/components/user/user.vue'
// 引入权限列表
import rights from '@/components/rights/rights.vue'
// 引入角色列表
import role from '@/components/rights/role.vue'
// 引入商品列表
import commodity from '@/components/commodity/commodity.vue'
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
        {path:'/user',name:'user',component:User},
        {path:'/rights', name:'rights', component:rights},
        {path:'/role',name:'role',component:role},
        {path:'/goods',name:'goods',component:commodity}
        
      ]
    },
   
  ]
})
