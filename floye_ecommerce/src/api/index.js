//当前模块，API进行统一管理，即对请求接口统一管理
import requests from "@/api/request";

//首页三级分类接口
export const reqCateGoryList = () => {
    //axios发请求最后返回的数据是Promise对象
    return requests({
        url: '/product/getBaseCategoryList',  //这里是不用再加api的
        method: 'GET'
    })
}
