import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter);
//1、先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
//2、重写push|replace（处理的是多次执行相同的push问题，控制台会出现警告）
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { y: 0 }
        }
    },
});

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name; //空对象的是无法进行判断的
    next()
    if (token) {
        if (to.path == '/login') {
            //不允许登录到登录页了，需要跳转到首页
            next("/");
        } else {
            // 如果有用户信息,那么就放行
            if (name) {
                next()
            } else {
                try {
                    // 没有的话，派发action，获取用户的信息
                    await store.dispatch("getUserInfo")
                    // 成功的话放行
                    next()
                } catch (error) {
                    // 失败的话，清除token，跳转到登录页
                    store.dispatch("userLogout")
                    next('/login')
                }
            }

        }
    } else {
        //2、未登录，首页或者登录页可以正常访问
        if (to.path === '/login' || to.path === '/home' || to.path === '/register')
            next()
        else {
            alert('请先登录')
            next('/login')
        }
    }
})
export default router;