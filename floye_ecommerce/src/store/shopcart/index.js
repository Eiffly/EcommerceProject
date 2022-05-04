import { reqGetCartList } from '@/api'

const state = {
    cartInfoList: []
};
const mutations = {
    GETCARLIST(state, data) {
        state.cartInfoList = data
    }
};
const actions = {
    //获取数据
    async getCarList({ commit }) {
        let result = await reqGetCartList();
        if (result.code == 200) {
            commit('GETCARLIST', result.data)
        } else {
            console.log(result.message);
        }
    }
};

const getters = {
    cartInfoList(state) {
        return state.cartInfoList[0] || {}
    }
};


export default {
    state,
    actions,
    mutations,
    getters
}