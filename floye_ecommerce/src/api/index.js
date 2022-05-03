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


