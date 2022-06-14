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
import { Button, Select, MessageBox } from 'element-ui';

import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif';
import "@/plugins/validate";

Vue.use(VueLazyload, {
  loading: atm,
})


Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carouse.name, Carouse)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API //安装全局事件总线，$bus就是当前应用的vm
  },
  router,
  store,
}).$mount('#app')
