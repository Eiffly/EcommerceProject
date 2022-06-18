<template>
  <div>
    <!-- 三级联动分类展示 -->
    <el-card class="box-card" style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <!-- 商品属姓 -->
    <el-card class="box-card" style="margin: 20px 0">
      <!-- 展示商品页面 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          style="margin: 0 0 10px 0"
          >添加属性</el-button
        >
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50px">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="180">
          </el-table-column>
          <el-table-column label="属性值列表">
            <!-- 使用tag标签和插槽  -->
            <template slot-scope="{ row }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 10px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="{ row }">
              <el-button
                icon="el-icon-edit"
                type="warning"
                @click="updateTradeMark(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteTradeMark(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加商品页面 -->
      <div v-show="!isShowTable">
        展示我
        <el-form label-width="80px">
          <el-form-item label="属性名">
            <el-input></el-input>
          </el-form-item>
          <!-- 添加属性 -->
          <el-button type="primary" icon="el-icon-plus">添加属性名</el-button>
          <el-button @click="isShowTable = true" style="margin:10px 0">取消</el-button>
          <!--  -->
          <el-table border :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="100px">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
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
      isShowTable: false,
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
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },

    // 展示商品属性
  },
};
</script>

<style>
</style>