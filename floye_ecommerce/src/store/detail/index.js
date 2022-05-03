import { reqGetGoodInfo } from "@/api"


const state = {
    goodInfo: {}
}
const mutations = {
    GETGOODINFO(state, data) {
        state.goodInfo = data
    }
};
const actions = {
    async getGoodInfo({ commit }, skuId) {
        // 需要传入相应的参数
        let result = await reqGetGoodInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    }
};
const getters = {
}
//对外暴露store的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}
