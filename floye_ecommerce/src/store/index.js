import Vue from 'vue'
import Vuex from 'vuex'
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
Vue.use(Vuex)

//对外暴露store的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart
    }
})