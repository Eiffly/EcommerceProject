import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import TypeNav from "@/components/TypeNav"
import Carouse from "@/components/Carouse"
import Pagination from "@/components/Pagination"
import store from '@/store'
import '@/mock/mockServer'
import "swiper/css/swiper.min.css"
import * as API from '@/api'


// import { reqCateGoryList } from '@/api'
//发起请求
// reqCateGoryList();



Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carouse.name, Carouse)
Vue.component(Pagination.name, Pagination)

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API //安装全局事件总线，$bus就是当前应用的vm
  },
  router,
  store,
}).$mount('#app')
