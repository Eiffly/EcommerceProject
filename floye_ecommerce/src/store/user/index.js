import { reqGetCode, reqUserRegister } from '@/api'

const state = {
    code: ""
};
const mutations = {
    GETCODE(state, data) {
        state.code = data
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