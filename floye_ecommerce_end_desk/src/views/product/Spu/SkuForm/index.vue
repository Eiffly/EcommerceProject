<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          v-model="skuInfo.price"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
          type="textarea"
          rows="4"
        ></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in attrInfoList"
            :key="attr.id"
            ><el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              ></el-option> </el-select
          ></el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            ><el-select
              placeholder="请选择"
              v-model="saleAttr.attrIdAndValueId"
            >
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option> </el-select
          ></el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          border
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80px"></el-table-column>
          <el-table-column label="图片" width="width" prop="">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="width"
            prop="imgName"
          ></el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="row.isDefault === 0"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button type="success" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveData">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      //收集sku数据的字段
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        //第二类：需要通过数据双向绑定v-model收集
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",
        //第三类：需要自己书写代码
        //默认图片
        skuDefaultImg: "",
        //收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        //平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        //销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {},
      //收集图片的数据字段:但是需要注意，收集的数据目前缺少isDefault字段，将来提交给服务器数据的时候，需要整理参数
      imageList: [],
    };
  },
  methods: {
    // 返回服务器的数据
    async getData(category1Id, category2Id, spu) {
      console.log(spu);
      //收集一些从父组件中收集的数据
      this.category3Id = spu.category3Id;
      this.spuId = spu.id;
      this.tmId = spu.tmId;
      this.spu = spu;

      let result = await this.$API.spu.reqSpuImageLIst(category1Id);
      if (result.code == 200) {
        let list = result.data;
        list.forEach((item) => {
          // 添加isDefault属性，因为这决定了以后数据的存留
          this.$set(item, "isDefault", 0);
        });
        this.spuImageList = list;
      }
      let result1 = await this.$API.spu.reqSpuSaleAttrList(category1Id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }
      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },

    // 选择图片：参数是里面的选择的内容
    handleSelectionChange(selection) {
      this.imageList = selection;
    },

    //选择默认图片，干掉别人，选择自己
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      //收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 取消事件
    cancel() {
      this.$emit("changeScenes", 0);
      // 清空之前的数据
      Object.assign(this._data, this.$options.data());
    },

    // 保存事件
    async saveData() {
      //解构之前的数据
      const { skuInfo, attrInfoList, spuSaleAttrList, imageList } = this;
      // 获取平台属性
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, cur) => {
        if (cur.attrIdAndValueId) {
          const [attrId, valueId] = cur.attrIdAndValueId.split(":");
          // console.log(attrId,valueId)
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      // 获取销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, cur) => {
        if (cur.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = cur.attrIdAndValueId.split(":");
          // console.log(attrId,valueId)
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);

      // 保存图片
      skuInfo.skuImageList = imageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      // 发送请求
      let result = await this.$API.spu.reqAddSku(skuInfo);
      if (result.code == 200) {
        this.$message({ type: "success", message: "添加SKU成功" });
        //  this.$emit("changeScenes",0)
      }
    },
  },
};
</script>

<style>
</style>