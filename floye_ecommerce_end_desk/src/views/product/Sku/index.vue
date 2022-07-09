<template>
  <div>
    <el-table :data="records" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        width="width"
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        width="width"
      ></el-table-column>
      <el-table-column label="默认图片" width="150">
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(KG)"
        prop="weight"
        width="width"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
        width="100"
      ></el-table-column>
      <el-table-column label="操作" prop="" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == 0"
            @click="sale(row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-bottom"
            size="mini"
            v-else
            @click="cancle(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit()"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- @current-change=""  -->
    <el-pagination
      align="center"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      layout=" prev, pager, next, jumper, ->,sizes, total, slot"
    >
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer
      title="我是标题"
      :visible.sync="show"
      :direction="direction"
      :show-close="false"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="Attr in skuInfo.skuAttrValueList"
              :key="Attr.id"
              style="margin-right: 10px"
              >{{ Attr.attrId }}-{{ Attr.valueId }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item
              v-for="image in skuInfo.skuImageList"
              :key="image.id"
            >
              <img :src="image.imgUrl" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 3, ////代表当前页面有几条数据
      total: 0, //存储分页器一共展示的数据
      records: [], //存储SKU列表的数据
      show: false,
      direction: "rtl",
      skuInfo: {},
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages;
      //获取sku数据
      const { page, limit } = this;
      // 数据展示
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 控制每一页显示多少内容
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async sale(row) {
      row.isSale = 1;
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "该产品上架成功" });
      }
    },
    // 下架
    async cancle(row) {
      row.isSale = 0;
      let result = await this.$API.sku.reqCancel(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "该产品下架成功" });
      }
    },

    // 正在开发中
    edit() {
      this.$message({ message: "产品正在开发中..." });
    },
    //展示sku的抽屉
    async getSkuInfo(row) {
      this.show = true;
      let result = await this.$API.sku.reqSkuById(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
  },
};
</script>



<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>

<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
}
.el-col {
  margin: 10px 10px;
}
</style>