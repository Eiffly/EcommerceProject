import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: "",
    // token: "",
    token: getToken(),
    userInfo: {}
};
const mutations = {
    GETCODE(state, data) {
        state.code = data
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR() {
        state.token = ""
        state.userInfo = {};
        // 清除本地存储的内容
        removeToken();
    }
};
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
        } else {
            return Promise.reject(new Error("failed"))
        }
    },

    async userRegister({ commit }, { phone, code, password }) {
        let result = await reqUserRegister({ phone, code, password })
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        //服务器会返回token
        if (result.code === 200) {
            //token存入vuex
            commit("USERLOGIN", result.data.token);
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    // 跳转之后的首页显示
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        // console.log(result);
        //服务器会返回data
        if (result.code === 200) {
            //token存入vuex
            commit("GETUSERINFO", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },

    //退出登录事件
    async userLogout({ commit }) {
        let result = await reqLogout();
        if (result.code === 200) {
            commit("CLEAR")
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    }
};

const getters = {

};

export default {
    state,
    actions,
    mutations,
    getters
}