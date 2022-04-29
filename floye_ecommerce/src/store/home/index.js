import { reqCateGoryList, reqgetBannerList, reqgetFloorList } from "@/api";

const state = {
    categoryList: [],
    containerList: [],
    floorList: []
}
const mutations = {
    CATEGORYLIST(state, data) {
        // console.log(data);
        state.categoryList = data
    },
    CONTAINERLIST(state, data) {
        state.containerList = data
    },
    FLOORLIST(state, data) {
        state.floorList = data
    },
};
const actions = {
    async categoryList({ commit }) {
        let result = await reqCateGoryList()
        // console.log(result);
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async containerList({ commit }) {
        let result = await reqgetBannerList()
        // console.log(result);
        if (result.code == 200) {
            commit('CONTAINERLIST', result.data)
        }
    },
    async floorList({ commit }) {
        let result = await reqgetFloorList()
        // console.log(result);
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
        }
    },
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
