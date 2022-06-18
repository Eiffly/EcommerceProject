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
        <template slot-scope="{row}">
          <el-button
            icon="el-icon-edit"
            type="warning"
            @click="updateTradeMark(row)"
            >更新</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
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
    <el-dialog
      :title="tmForm.id ? '修改品牌信息' : '添加品牌信息'"
      :visible.sync="dialogFormVisible"
    >
      <!--Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。  -->
      <el-form :model="tmForm" :rules="rules" ref="ruleForm" style="width: 80%">
        <!-- 第一行：商品的信息 -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <!-- 第二行：上传商品的图片 -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
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
    // 自定义表单验证规则
    var validateTmName = (rule, value, callback) => {
      if (value.length > 10 || value.length < 2) {
        callback(new Error("品牌名称在2-10个字符"));
      } else {
        callback();
      }
    };
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
      //商品数据
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证规则
      rules: {
        tmName: [
          //品牌名称的验证规则
          //require:必须要校验字段（前面五角星有关系）  message 提示信息    trigger:用户行为设置（事件的设置:blur、change）
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { validator: validateTmName, trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请选择图片", trigger: "change" }],
      },
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
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
      //tmForm数据需要进行清空
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
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
    updateTradeMark(row) {
      // console.log(row);
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },

    // 图片上传成功之后的回调
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
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
    //添加数据或者更新数据
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let res = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmForm
          );
          // console.log(res);
          if (res.code == 200) {
            //关闭对话框
            this.dialogFormVisible = false;
            // 弹出对话内容
            this.$message({
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
              type: "success",
            });
            // 更新商品内容
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 删除品牌
    deleteTradeMark(row) {
      //弹框
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //当用户点击确定按钮的时候会出发
          //向服务器发请求
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          //如果删除成功
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //再次获取品牌列表数据
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          //当用户点击取消按钮的时候会触发
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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

