<template>
  <div>
    <el-form label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tradeMark.tmName"
            :value="tradeMark.id"
            v-for="(tradeMark, index) in tradeMarkList"
            :key="tradeMark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}项未选择`"
          v-model="AttrIdAndAttrName"
        >
          <!-- value收集的数据可以不只是id，我们这里同时收集id和name-->
          <el-option
            :label="unSelect.name"
            :value="`${unSelect.id}:${unSelect.name}`"
            v-for="unSelect in unSelectSaleAttr"
            :key="unSelect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!AttrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名"
            prop="saleAttrName"
            width="width"
          ></el-table-column>
          <el-table-column label="属性值名称列表" prop="" width="width">
            <!-- 面包屑 -->
            <template slot-scope="{ row, $index }">
              <!-- @close="handleClose(tag)" -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                :disable-transitions="false"
                size="small"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="didi"
                size="small"
                @keyup.native.enter="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <!-- 按下取消，切换场景scene：自定义组件，相当于子给父传消息 -->
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      //spu的数据
      spu: {
        category3Id: 0,
        tmId: "",
        description: "",
        spuName: "",
        spuImageList: [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "spuId": 0
          // }
        ],
        spuSaleAttrList: [
          // {
          //   "baseSaleAttrId": 0,
          //   "id": 0,
          //   "saleAttrName": "string",
          //   "spuId": 0,
          //   "spuSaleAttrValueList": [
          //     {
          //       "baseSaleAttrId": 0,
          //       "id": 0,
          //       "isChecked": "string",
          //       "saleAttrName": "string",
          //       "saleAttrValueName": "string",
          //       "spuId": 0
          //     }
          //   ]
          // }
        ],
      },
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储SPU图片的数据
      saleAttrList: [], //销售属性的数据（项目全部的销售属性）\
      AttrIdAndAttrName: "",
    };
  },
  methods: {
    // 移除图片:
    handleRemove(file, fileList) {
      //file:被删除的图片的信息，fileList剩余图片列表的信息
      // console.log(file, fileList);
      this.spuImageList = fileList;
    },
    // 预览图片:不需要收集数据
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      // console.log(fileList);
      //收集图片的信息
      this.spuImageList = fileList;
    },

    // 添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.AttrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      // 清除option-select里面的内容
      this.AttrIdAndAttrName = "";
    },

    // 添加销售属性值
    addSaleAttrValue(row) {
      // 需要收集三个数据
      // console.log(row)
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      // console.log(this.$refs);
      this.$nextTick(() => {
        this.$refs.didi.focus();
      });
    },

    // 添加销售属性值的失去焦点
    handleInputConfirm(row) {
      // console.log(row)
      const { baseSaleAttrId, inputValue } = row;
      // 判断是不是空
      if (inputValue.trim() == "") {
        this.$message("您输入的数值为空");
        return;
      }
      //
      const result = row.spuSaleAttrValueList.some((item) => {
        return item.saleAttrValueName == inputValue.trim();
      });
      if (result) return;
      //添加新的销售属性值
      const newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue.trim(),
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },

    //初始化展示
    //这里是通过编辑Edit触发的，通过this.$refs.spu.initSpuData(row)方法
    async initSpuData(row) {
      let spuResult = await this.$API.spu.reqSpu(row.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      let trademarkResult = await this.$API.spu.reqTradeMarkList();
      if (trademarkResult.code == 200) {
        this.tradeMarkList = trademarkResult.data;
      }
      let spuImageResult = await this.$API.spu.reqSpuImageList(row.id);
      //由于数据不是一一对应的，接口要求收集的数据是具有name和url属性的，但是我们这里是imgName和imgUrl,不能够一一对应上
      if (spuImageResult.code == 200) {
        let imagelist = spuImageResult.data;
        imagelist.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = imagelist;
      }
      let baseSaleAttrResult = await this.$API.spu.reqBaseSaleAttrList();
      if (baseSaleAttrResult.code == 200) {
        this.saleAttrList = baseSaleAttrResult.data;
      }
    },

    // 保存SPU
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          name: item.imgName,
          url: (item.response && item.response.data) || item.url,
        };
      });
      // 传递API
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu);
      if (result.code == 200) {
        this.$message({ type: "success", message: "SPU信息保存成功" });
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "修改" : "添加",
        });
      }
      Object.assign(this._data, this.$options.data());
    },
    // 添加SPU
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 取消事件
    cancel() {
      this.$emit("changeScene", {
        scene: 0,
        flag: this.spu.id ? "修改" : "添加",
      });
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    // 未被平台选中的属性
    unSelectSaleAttr() {
      let attrList = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          // 销售属性的名称不等于当前的销售属性的名称
          return item.name != item1.saleAttrName;
        });
      });
      return attrList;
    },
  },
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
