1:添加属性与属性列表的切换?


2:添加属性静态组件完成？




3:书写添加的接口，查看需要收集数据信息（将来传递给服务器：字段必须按照服务器要求）



4:收集添加属性数据的----表格占位思想?(需要查看接口文档)



5:解决添加属性值bug？



6:修改属性值列表？






7:编辑与展示模式切换？





7:保存属性值列表





8:后期完善





属性名  与   属性值关系

举例子：前台项目手机的售卖属性

属性值         属性值

颜色            黑色 粉色  蓝色
 
内存            4  8 126

操作系统    windows 、linux




{
  "attrName": "string",//收集添加或者修改的属性值名字
  "attrValueList": [  //收集相应的属性的属性值数组
    {
      "attrId": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0,  //三级id
  "categoryLevel": 3,
}






//响应式数据数组

data:{
   arr:[]
}

//变更
this.arr.push()
//替换
this.arr = [];