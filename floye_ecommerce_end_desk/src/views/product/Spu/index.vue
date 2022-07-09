<template>
  <div>
    <!-- 三级联动 -->
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!show"
      ></CategorySelect>
    </el-card>

    <!-- 下方的表格展示 -->
    <el-card>
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <!-- 表格 -->
        <el-table :data="records" border style="margin: 20px 0px">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="spu名称"
            prop="spuName"
            width="width"
          ></el-table-column>
          <el-table-column
            label="spu描述"
            prop="description"
            width="width"
          ></el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <HintButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SPU"
                @click="addSku(row)"
              ></HintButton>
              <HintButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="updateSpu(row)"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看SPU"
                @click="handler(row)"
              ></HintButton>
              <el-popconfirm
                :title="`确认删除${row.spuName}吗?`"
                @onConfirm="deleteSpu(row)"
              >
                <HintButton
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除SPU"
                  slot="reference"
                >
                </HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!-- @current-change=""  -->
        <el-pagination
          style="text-align: center"
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[3, 5, 10]"
          layout="prev, pager, next, jumper, ->, sizes,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        ></el-pagination>
      </div>

      <!-- spu -->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <!-- sku -->
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>

      <!-- 对话框 :before-close="close" 对话框关闭之前的回调-->
      <el-dialog
        :title="`${spu.spuName}的列表`"
        :visible.sync="dialogTableVisible"
        :before-close="close"
      >
      <!--v-loading="loading" 加载事件  -->
        <el-table :data="skuList" border v-loading="loading">
          <el-table-column
            prop="skuName"
            label="产品名称"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="weight"
            label="重量"
            width="width"
          ></el-table-column>
          <el-table-column prop="skuDefaultImg" label="产品图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "@/views/product/Spu/SkuForm";
import SpuForm from "@/views/product/Spu/SpuForm";
export default {
  name: "Spu",
  components: {
    SkuForm,
    SpuForm,
  },
  data() {
    return {
      //三级联动
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 商品展示
      show: true,
      // 当前页面
      page: 1,
      // 页面展示多少条数据
      limit: 3,
      // 总的数据条数
      total: 0,
      // 商品列表
      records: [],
      // 切换SPU的管理内容
      scene: 0,
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      // 加载效果
      loading: true,
    };
  },

  methods: {
    // 获得三级联动的数据
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
        this.getSpuList();
      }
    },

    // SPU展示
    async getSpuList(pages = 1) {
      this.page = pages;
      // API
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
      console.log(result);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    //改变每一页的显示数目
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加SPU的回调
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改SPU的回调
    updateSpu(row) {
      this.scene = 1;
      // console.log(row)
      this.$refs.spu.initSpuData(row);
    },

    //删除SPU的回调
    async deleteSpu(row) {
      // 数据
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        //删除数据
        this.$message({ type: "success", message: "删除成功" });
        //代表SPU个数大于1删除的时候停留在当前页，如果SPU个数小于1 回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },

    //修改spu场景
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "修改") {
        // 停留在当前页
        this.getSpuList(this.page);
      } else {
        // 停留在第一页
        this.getSpuList();
      }
    },
    //修改spu场景
    changeScenes(Scenes) {
      this.scene = Scenes;
    },

    //修改场景
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    //详细信息展示  reqSkuList
    async handler(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      let result = await this.$API.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        //改变加载事件
        this.loading = false;
      }
    },
    // 对话框dialog关闭前的回调
    close(done) {
      this.loading = true;
      this.skuList = [];
      done();
    },
  },
};
</script>

<style>
</style>