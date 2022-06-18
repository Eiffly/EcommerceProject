//这个模块主要获取的是品牌管理的数据的模块
import request from '@/utils/request';
//获取品牌列表接口
///admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' });

// 添加商品或者更新商品
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    if (!tradeMark.id) {
        // 添加品牌
        return request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: tradeMark })
    } else {
        // 修改品牌
        return request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: tradeMark })
    }
}


export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' });
