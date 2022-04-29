import { reqGetSearchInfo } from "@/api"
const state = {
    searchInfo: {}
}
const mutations = {
    GETSEARCHINFO(state, data) {
        state.searchInfo = data
    }
};

const actions = {
    //注意这里必须要传入参数的，否则状态码是错误
    async getSearchInfo({ commit }, params) {
        let result = await reqGetSearchInfo(params)
        console.log(result);
        if (result.code == 200) {
            commit('GETSEARCHINFO', result.data)
        }
    }
};
const getters = {
    goodsList(state) {
        // 如果是收不到请求的话，就采用空数组
        return state.searchInfo.goodsList || []
    },
    attrsList() {
        return state.searchInfo.attrsList || []
    },
    trademarkList() {
        return state.searchInfo.trademarkList || []
    }
}
//对外暴露store的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}
