import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"

Vue.use(VueRouter);
//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            meta: { show: true }
        },
        {
            path: "/search/:keyword",
            component: Search,
            meta: { show: true }
        },
        {
            path: "/login",
            component: Login,
            meta: { show: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        {
            path: "*",
            redirect: "/home"
        }
    ]
})