import { reqGetCartList, deleteCartList, reqUpdateCheckedByid } from '@/api'

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
    },
    //删除某一项产品
    async deleteCarList({ commit }, skuId) {
        let result = await deleteCartList(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },

    // 更新某一个产品的勾选状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },



    // 删除所有选中的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        let cartInfoList = getters.cartInfoList.cartInfoList
        let PromiseAll = []
        cartInfoList.forEach(cartInfo => {
            PromiseAll.push(cartInfo.isChecked === 1 ? dispatch('deleteCarList', cartInfo.skuId) : '')
        });
        return Promise.all(PromiseAll)
    },

    //更新产品的全选状态 -->是全选决定剩下的每一个
    updateAllCarIsChecked({ dispatch, getters }, isChecked) {
        let cartInfoList = getters.cartInfoList.cartInfoList;
        let PromiseAll = []
        cartInfoList.forEach(item => {
            let result = dispatch('updateCheckedById', {
                skuId: item.skuId, isChecked
            })
            // 更改商品的状态
            PromiseAll.push(result)
        })
        return Promise.all(PromiseAll)
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