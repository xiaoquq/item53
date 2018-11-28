// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios模块
import MyServerHttp from '@/plugins/http.js'
// 引入moment.js
import moment from 'moment'

import router from './router'

// 引入css样式
import '@/assets/css/base.css'

// 调用插件
Vue.use(ElementUI);
Vue.use(MyServerHttp);

Vue.config.productionTip = false

// 定义全局过滤器
Vue.filter('fmData',(v)=>{
  return moment(v).format('YYYY-MM-DD')
}) 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
