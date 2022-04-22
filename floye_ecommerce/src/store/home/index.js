import { reqCateGoryList } from "@/api";
const state = {
    categoryList: []
}
const mutations = {
    CATEGORYLIST(state, data) {
        // console.log(data);
        state.categoryList = data
    }
};
const actions = {
    async categoryList({ commit }) {
        let result = await reqCateGoryList()
        // console.log(result);
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
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
