<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum[0] > 1"
      :class="{ active: pageNo == 1 }"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>
    <button v-if="startNumAndEndNum[0] > 2">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startNumAndEndNum[1]"
      :key="index"
      v-show="page >= startNumAndEndNum[0]"
      :class="{ active: pageNo == page }"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum[1] < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum[1] < totalPage"
      :class="{ active: pageNo == totalPage }"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button @click="$emit('getPageNo', pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>

   
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总的页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //开始页与结束页
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start, end;
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return [start, end];
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: rgb(180, 55, 55);
      color: #fff;
    }
  }
}
</style>
