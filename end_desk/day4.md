1:属性管理在进行添加属性的时候,三级联动不可操作；



2:SPU功能演示
SKU可以理解为'类'，SKU可以理解为‘类的时候’
比如:你购买一个产品iphonX手机，那么iphoneX手机即为一个SPU,但是你购买的时候不可以能iphoneX手机为单位进行购买。
商家也不可能iphonX为单位记录库存?商家什么颜色、内存、型号的iphonex为单位进行库存记录。那么更加细微的单位即为SPU


3:SPU页面三级联动?





4:SPU列表的实现
--获取SPU列表数据
--静态组件
--获取SPU列表动态展示
--实现三个页面在SPU切换显示
--三个按钮点击跳转



5:修改SPU
--完成SpuForm静态
--SpuForm请求接口分析与接口书写
--点击修改SPU按钮父组件调用SpuForm子组件方法进行请求
--展示数据（收集数据）











{
  "category3Id": 0,
  "description": "string",
  "spuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "spuId": 0
    }
  ],
  "spuName": "string",
  "spuSaleAttrList": [
    {
      "baseSaleAttrId": 0,
      "id": 0,
      "saleAttrName": "string",
      "spuId": 0,
      "spuSaleAttrValueList": [
        {
          "baseSaleAttrId": 0,
          "id": 0,
          "isChecked": "string",
          "saleAttrName": "string",
          "saleAttrValueName": "string",
          "spuId": 0
        }
      ]
    }
  ],
  "tmId": 0
}





组件实例的方法:
$set:可以给组件实例添加动态的属性（响应式）
$nextTick：可以获取下载完毕的DOM真实节点。
应用场景:获取DOM
ref、swiper[第三方]





1:SPU模块开发
-----大概看了一下SPU模块业务
----SPU|SKU
SPU:类（People）  SKU：类的实例



2：SPU模块开发？
----静态组件
----获取SPU管理模块中SPU列表数据进行展示【API】
---底部（第二个card）三部分内容切换
---SpuFrom静态组件
---SPU列表与SPUFORM点击取消按钮进行切换



3：分析SPU修改的接口请求个数----4个
----SPU修改的时候这四个请求，什么时候发:v-show不能销毁组件（mounted只能执行一次）
----在点击父组件修改SPU的按钮的时候，获取子组件的方法，进行调用
----书写API，修改SPU（四个API请求）
---SpuFrom需要发请求|获取数据展示数据


{
  "category3Id": 0,
  "description": "string",
  "spuImageList": [
    {
      "id": 0,
      "imgName": "string",
      "imgUrl": "string",
      "spuId": 0
    }
  ],
  "spuName": "string",
  "spuSaleAttrList": [
    {
      "baseSaleAttrId": 0,
      "id": 0,
      "saleAttrName": "string",
      "spuId": 0,
      "spuSaleAttrValueList": [
        {
          "baseSaleAttrId": 0,
          "id": 0,
          "isChecked": "string",
          "saleAttrName": "string",
          "saleAttrValueName": "string",
          "spuId": 0
        }
      ]
    }
  ],
  "tmId": 0
}





