// 引入登录、退出登录、获取用户信息的杰阔函数
import { login, logout, getInfo } from '@/api/user'
// 获取、设置、删除Token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 路由模块中任意路由、重置路由的方法、异步路由、常量路由
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from '@/router';
import router from '@/router';
import cloneDeep from 'lodash/cloneDeep'


const getDefaultState = () => {
  return {
    // 获取用户token
    token: getToken(),
    // 获取用户名
    name: '',
    // 获取用户头像
    avatar: '',
    routes: [],
    buttons: [],
    roles: [],
    //对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的理由】
    resultAsyncRoutes: [],
    //用户最终需要展示全部路由
    resultAllRputes: []
  }

}

const state = getDefaultState()



const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 重置state
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 存储用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },

  //存储用户信息 
  SET_USERINFO: (state, data) => {
    state.name = data.name
    state.avatar = data.avatar
    state.routes = data.routes
    state.buttons = data.buttons
    state.roles = data.roles
  },

  //最终计算出的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    //vuex保存当前用户的异步路由，注意，一个用户需要展示完成路由：常量、异步、任意路由
    state.resultAsyncRoutes = asyncRoutes
    //计算出当前用户需要展示所有路由
    state.resultAllRputes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    //给路由器添加新的路由
    router.addRoutes(state.resultAllRputes)
  }
}


//定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter(item=>{
    if (routes.indexOf(item.name)!=-1){
      // 还要看二级路由和三级路由
      if (item.children && item.children.length){
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}


const actions = {
  // 用户登录
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password })
    // console.log(result);
    if (result.code == 20000 || result.code == 200) {
      const { data } = result
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      // resolve()
      return 'ok'
    } else {
      return Promise.reject(new Error('false'))
    }
  },

  //获取用户信息 返回的信息包括avatar、按钮权限button、name、roles（用户信息）、
  // routes 表示的不用类型的用户的权限
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('SET_USERINFO', data)
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(cloneDeep(asyncRoutes), data.routes));        // const { name, avatar } = data
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

