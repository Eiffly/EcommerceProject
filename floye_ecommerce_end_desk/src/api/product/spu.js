//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request';

//获取一级分类的数据
export const reqSpuList = (page,limit,category3Id) => request(
    { url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id }});

// 获取SPU信息： reqSpu /admin/product/getSpuById/{spuId}   get
export const reqSpu = (spuId) => request(
    { url: `/admin/product/getSpuById/${spuId}`, method: 'get'});

// 获取品牌的信息: reqTradeMarkList/admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMarkList = () => request(
    { url: "/admin/product/baseTrademark/getTrademarkList", method: 'get' });


// 获取SPU图标的接口：reqSpuImageList  /admin/product/spuImageList/{spuId} get
export const reqSpuImageList = (spuId) => request(
    { url: `/admin/product/spuImageList/${spuId}`, method: 'get' });

    
// 获取平台全部销售属性----整个平台销售属性一共三个  reqBaseSaleAttrList /admin/product/baseSaleAttrList   get
export const reqBaseSaleAttrList = () => request(
    { url: "/admin/product/baseSaleAttrList", method: 'get' });
