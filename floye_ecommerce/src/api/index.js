//当前模块，API进行统一管理，即对请求接口统一管理
import requests from "@/api/request";
import mockRequests from "@/api/mockRequests";

//首页三级分类接口
export const reqCateGoryList = () => requests.get(`/product/getBaseCategoryList`);

// 获取Banner（Home首页轮播图）
export const reqgetBannerList = () => mockRequests.get('/banner')
export const reqgetFloorList = () => mockRequests.get('/floor')
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: 'POST',
    data: params
})

export const reqGetGoodInfo = (skuId) => requests({
    url: `/item/${skuId}`, method: 'GET'
})

// 更新购物车数据 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddorUpdateShopCar = ({ skuId, skuNum }) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST'
})

// 获取购物车列表 /api/cart/cartList
export const reqGetCartList = () => requests({
    url: `/cart/cartList`, method: 'GET'
})

//删除商品 /api/cart/deleteCart/{skuId} DELETE
export const deleteCartList = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`, method: 'DELETE'
})

//切换商品选中状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

//获取验证码  /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });


//获取验证码 /api/user/passport/register 带上的数据：phone password code

export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'POST' });
