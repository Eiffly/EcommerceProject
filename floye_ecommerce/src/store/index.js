import Vue from 'vue'
import Vuex from 'vuex'
import home from "./home";
import search from "./search";
Vue.use(Vuex)

//对外暴露store的一个实例
export default new Vuex.Store({
    modules: {
        home,
        search
    }
})