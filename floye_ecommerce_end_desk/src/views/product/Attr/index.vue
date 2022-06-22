<template>
  <div>
    <!-- 三级联动分类展示 -->
    <el-card class="box-card" style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"></CategorySelect>
    </el-card>

    <!-- 商品属姓 -->
    <el-card class="box-card" style="margin: 20px 0">
      <!-- 正常展示情况 -->
      <div v-show="isShowTable">
        <!-- 展示商品页面 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          style="margin: 0 0 10px 0"
          >添加属性</el-button
        >
        <el-table :data="attrList">
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150"
          ></el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                style="margin: 0px 10px"
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row,$index}">
              <!-- 修改属性值 -->
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="updateAttr(row)"
                style="margin: 0px 20px"
              ></el-button>
              <el-popconfirm  :title="`确认删除${row.attrName}吗?`"
                @onConfirm="deleteAttr($index)">
                <el-button type="danger" icon="el-icon-delete"  slot="reference"></el-button>
                </el-popconfirm>
              
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加属性的情况 -->
      <div v-show="!isShowTable">
        <!-- 展示商品页面 -->
        <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="addAttrValue"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          >添加属性值
        </el-button>
        <el-button type="" @click="isShowTable = true" margin="20px 0px"
          >取消</el-button
        >
        <el-table
          border
          style="margin: 20px 0px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column label="属性值名称" prop="prop">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                size="mini"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span v-else @click="toEdit(row, $index)">
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确认删除${row.valueName}吗?`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button type="" @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //商品列表
      attrList: [],
      //一上来先进行展示
      isShowTable: true,
      //收集添加到的属性值
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        //代表三级分类的id有了
        this.category3Id = categoryId;
        //发请求获取平台的属性数据
        this.getAttrList();
      }
    },
    // 当用户确定三级分类的数据时候，可以向服务器发请求获取平台属性进行展示
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result);
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },

    // 添加商品属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）
        valueName: "",
        flag: true,
      });
      // 点击添加属性的时候 需要获得焦点
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },

    // 添加属性按钮的回调
    addAttr() {
      this.isShowTable = false;
      // 清除数据并且收集三级分类的id
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 修改属性值的操作
    updateAttr(row) {
      this.isShowTable = false;
      // 进行数据的深拷贝
      this.attrInfo = cloneDeep(row);
      // 修改某一个属性的时候，将相应的属性值的元素添加上flag这个标记, 但是数据应该是响应式数据（
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },

    //切换到浏览模式 toLook
    toLook(row) {
      row.flag = false;
    },
    //切换到编辑模式 toEdit
    toEdit(row, index) {
      row.flag = true;
      // 获得焦点
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },

    // 气泡确认框确定按钮的回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },

    //删除某个属性
    deleteAttr(index) {
      this.attrList.splice(index, 1);
    },

    // 将修改的数据进行保存
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
        // 得到最后的结果
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
        // 展示平台属性的信号量进行切换,
        this.isShowTable = true;
        //提示消失
        this.$message({ type: "success", message: "保存成功" });
        //保存成功以后需要再次获取平台属性进行展示
        this.getAttrList();
      } catch (error) {
        this.$message({ type: "info", message: "保存失败，请重试" });
      }
    },
  },
};
</script>

<style>
</style>