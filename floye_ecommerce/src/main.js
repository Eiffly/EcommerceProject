import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import TypeNav from "./pages/Home/TypeNav"
import store from '@/store'



import { reqCateGoryList } from '@/api'
//发起请求
reqCateGoryList();

Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
