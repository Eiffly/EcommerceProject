<template>
  <div>
    <!-- 添加商品按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
      >添加</el-button
    >

    <!--添加表单-->
    <el-table style="width: 100%" :border="true" :data="list">
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{}">
          <el-button type="danger">删除</el-button>
          <el-button type="warning" @click="updateTradeMark">更新</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分页器 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :total="total"
      :current-page="page"
      :page-size="3"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%">
        <!-- 第一行：商品的信息 -->
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <!-- 第二行：上传商品的图片 -->
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      //代表的分页器第几页
      page: 1,
      //当前页数展示数据条数
      limit: 3,
      //总共数据条数
      total: 0,
      //列表展示的数据
      list: [],
      // 对话框的显示与隐藏
      dialogFormVisible: false,
      //图片地址
      imageUrl: "",
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 展示商品数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 先解构出数据
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 更改每一页显示的内容数量
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },

    //添加商品
    showDialog() {
      this.dialogFormVisible = true;
    },
    // 更新商品
    updateTradeMark() {
      this.dialogFormVisible = true;
    },

    // 图片上传成功之后的回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传成功之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

