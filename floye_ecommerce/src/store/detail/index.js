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
    categoryView(state) {
        // 注意这里可能会出现一种情况，那就是一开始的categoryView是undefined
        // 但是我们后面会用到categoryView的一些属性，比如categoryView.category1Id是找不到的
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}

    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }

}
//对外暴露store的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}
