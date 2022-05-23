<template>
  <div>
    <!-- 行内form -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="getCategory2List"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="cForm.category2Id"
          placeholder="请选择"
          @change="getCategory3List"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ["show"],
  data() {
    return {
      //一级分类的数据---数组
      list1: [],
      //二级分类的数据---数组
      list2: [],
      //三级分类的数据---数组
      list3: [],
      //收集id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: ""
      }
    };
  },
  //获取一级分类的数据
  mounted() {
    this.getCategory1List();
  },
  methods: {
    //当组件已挂在完毕，立刻获取一级分类的数据
    async getCategory1List() {
      let result = await this.$API.attr.reqGetCategory1();
      if (result.code == 200) {
        //组件实例需要存储一级分类数据
        this.list1 = result.data;
      }
    },
    //获取二级分类的数据[一级分类的change回调]
    async getCategory2List(category1Id) {
      //出发自定义事件-----子给父通信
      this.$emit("getCategoryId", {
        categoryId: this.cForm.category1Id,
        flag: 1
      });
      //清除数据
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.list2 = [];
      this.list3 = [];
      //获取二级分类的数据
      let result = await this.$API.attr.reqGetCategory2(category1Id);
      if (result.code == 200) {
        this.list2 = result.data;
      }
    },
    //获取三级分类的数据【二级分类的chang事件回调】
    async getCategory3List(category2Id) {
      //触发自定义事件----子给父通信
      this.$emit("getCategoryId", {
        categoryId: this.cForm.category2Id,
        flag: 2
      });
      //清空数据
      this.cForm.category3Id = "";
      this.list3 = [];
      let result = await this.$API.attr.reqGetCategory3(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
      }
    },
    //三级分类下拉框的回调函数
    handler() {
      //触发自定义事件----子给父通信
      this.$emit("getCategoryId", {
        categoryId: this.cForm.category3Id,
        flag: 3
      });
    }
  }
};
</script>
<style scoped></style>
