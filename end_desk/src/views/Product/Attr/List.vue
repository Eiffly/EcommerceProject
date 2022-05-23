<template>
  <div>
    <el-card>
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card style="margin-top:20px">
      <!-- 展示属性值列表的table -->
      <div v-show="isShowTable">
        <!-- 底部的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="changeShowTable"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <!-- table表格 -->
        <el-table style="width: 100%;margin-top:10px" border :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150px"
          ></el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{ row, index }">
              <el-tag
                type="danger"
                :hit="true"
                :disable-transitions="true"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin:10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请你输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加属性值与取消按钮 -->
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <!-- 表格 -->
        <el-table
          style="width: 100%;margin:20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                size="mini"
                v-show="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-show="!row.flag"
                style="display:block"
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="attrInfo.attrValueList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttrInfo" :disabled="!attrInfo.attrValueList.length>0">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  //data函数当中不允许书写this.xxx
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //属性列表的数据
      attrList: [],
      //用户展示属性列表的表格与添加属性【修改属性切换的flag】
      isShowTable: true,
      //收集添加||或者修改的信息对象----(带给服务器)
      attrInfo: {
        attrName: "", //收集添加或者修改的属性值名字
        attrValueList: [], //收集相应的属性的属性值数组
        categoryId: "", //三级id
        categoryLevel: 3
      }
    };
  },
  methods: {
    //父组件中的函数:(自定义事件的回调)
    getCategoryId({ categoryId, flag }) {
      if (flag == 1) {
        this.category1Id = categoryId;
        //清空父组件的数据
        this.category2Id = "";
        this.category3Id = "";
      } else if (flag == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //当用户选择完三级联动----父组件要发请求获取数据
        this.getAttrList();
      }
    },
    //获取属性列表的方法
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    //点击添加属性按钮的回调函数
    changeShowTable() {
      this.isShowTable = false;
      //清空数据
      this.attrInfo = {
        attrName: "", //收集添加或者修改的属性值名字
        attrValueList: [], //收集相应的属性的属性值数组
        categoryId: this.category3Id, //三级id
        categoryLevel: 3
      };
    },
    //点击添加属性值的按钮的回调  -----------
    addAttr() {
      //占位，当用户点击添加属性值按钮的是，需要向数组添加一个对象【一个属性值】
      //attrId,是属性的id，比如颜色：颜色【1190】  属性值：粉色，蓝色、青色
      //attrId:某一个售卖属性的id，添加的时候确实没有id，但是你书写【attrId：undefined】
      //修改的时候attrId是有的，你需要带给服务器
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        //点击添加属性值按钮的时候，属性值对象身上添加了一个flag属性，用于控制每一个属性值当中是显示input|span
        //将来点击保存按钮的时候，向服务器发请求，flag干掉，因为服务器不需要这个参数
        //flag是不是响应式数据
        flag: true
      });

      //添加的新的属性值，一定是数组最后一项，获取节点，聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //修改某一个属性的回调
    updateAttr(row) {
      this.isShowTable = false;
      //由于row当前数据结构比较复杂，里面有数组，数组里面还有对象，浅拷贝搞不定了，深拷贝
      //lodash：防抖、节流、深拷贝
      //市场当中还有一些类似于lodash函数，underscore
      this.attrInfo = cloneDeep(row);
      //修改数据的时候，传递过来的数据，都给他们加上标记flag 【编辑与查看模式切换】
      this.attrInfo.attrValueList.forEach(item => {
        //在给一个对象添加新的属性
        //以后工作的时候，你发现数据变了，但是视图不变【因为这条数据不是相应的】 $set     $nextTick
        this.$set(item, "flag", false);
      });
    },
    //切换为查看状态---显示span
    toLook(row) {
      //输入的属性值名称不能出现空格---没有内容
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值名称");
        return;
      }
      //添加的属性的属性值不能重复
      //  for(var i = 0 ; i < this.attrInfo.attrValueList.length-1;i++){
      //       if(row.valueName===this.attrInfo.attrValueList[i].valueName){
      //         return;
      //       }
      //  }
      //some:类似于for，可以遍历数组，some回调返回布尔值，要么真，要假的，作为some函数执行的结果
      let isRepeat = this.attrInfo.attrValueList.some(item =>row != item ? item.valueName === row.valueName : false);
      if (isRepeat) {
        this.$message("属性值名称重复,请选择一个新的属性值");
        return;
      }
      //直接变为查看模式
      row.flag = false;
    },
    //切换为编辑状态---显示input
    toEdit(row, index) {
      //flag切换
      row.flag = true;
      //当flag变为true,input标签要上树【虚拟DOM->真实的DOM渲染，渲染很耗事件的】
      //切记：以后功的时候通过ref获取真实DOM，如果获取不到$nextTick
      //切记：以后功的时候，数据发生变化但是视图不更新$set
      this.$nextTick(() => {
        //确保DOM上树-渲染完毕了，而且DOM存在了
        this.$refs[index].focus();
      });
    },
    //把新的属性与属性值|修改完毕的属性与属性值提交服务器
   async saveAttrInfo(){
       //整理数据----因为有一些数据服务器不需要
       //情况1:
       //1:valueName没有数值，不应该带给服务器
       //2:valuename有属性值，但是有一个KV flag   -----总结：带给服务器数据valueName应该有数值且没有flag
       this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
              //代表的是给服务器送的数据valueName有数值，且flag属性没了
              if(item.valueName!=''){
                  delete item.flag;
                  return true;
              }
       });
       //发请求
       let result  = await this.$API.attr.reqSaveAttrInfo(this.attrInfo);
       if(result.code==200){
          //回调table列表
          this.isShowTable = true;
          //再次获取数据
          this.getAttrList();
       }
    }
    ,
    //删除某一个属性
    async deleteAttr({id}){
      let result = await this.$API.attr.reqDeleteAttr(id);
      if(result.code==200){
        this.getAttrList();
      }
    }
  }
};
</script>

<style scoped></style>


[{a:1},{a:2},{a:3}]
