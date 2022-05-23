//负责品牌的接口
import request from '@/utils/request'
//获取品牌列表的数据
export const reqTradeMarkList = (page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'});

//新增产品或者修改某一个产品
export const reqAddOrUpdateTradeMark = (trademark)=>{
  //修改
   if(trademark.id){
       return request({url:'/admin/product/baseTrademark/update',data:trademark,method:'put'});
   }else{
     //新增
     return request({url:'/admin/product/baseTrademark/save',data:trademark,method:'post'});
   }
  
}
//删除品牌
export const reqDeleteTradeMarkById=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'});

