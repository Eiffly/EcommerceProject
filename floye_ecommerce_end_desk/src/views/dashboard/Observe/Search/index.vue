<template>
  <div>
    <!--  -->
    <div class="header">
      <div class="search_header">
        <span>线上热门搜索</span>
        <!-- 下拉菜单 -->
        <el-dropdown>
          <span>
            <svg
              t="1657422156726"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4070"
              width="20"
              height="20"
            >
              <path
                d="M224 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S276.928 608 224 608z"
                p-id="4071"
                fill="#bfbfbf"
              ></path>
              <path
                d="M512 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S564.928 608 512 608z"
                p-id="4072"
                fill="#bfbfbf"
              ></path>
              <path
                d="M800 608c-52.928 0-96-43.072-96-96s43.072-96 96-96c52.928 0 96 43.072 96 96S852.928 608 800 608z"
                p-id="4073"
                fill="#bfbfbf"
              ></path>
            </svg>
          </span>
          <el-dropdown-menu class="el-dropdown-menu">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>


    <!-- 中间部分 -->
    <div>
      <!-- 图表 -->
      <el-row :gutter="10">
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
        <el-col :span="12">
          <lineCharts></lineCharts>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="排名" type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="100">
        </el-table-column>
        <el-table-column prop="address" label="用户数" width="width" sortable>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="width" sortable>
        </el-table-column>
      </el-table>
      <!-- 分页器 @current-change="" -->
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script >
import lineCharts from "./lineCharts";
export default {
  name: "Search",
  components: {
    lineCharts,
  },
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 5px 0px;
}
.search_header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

/* 深度选择器 */
/* 因为el-pagination是一个封装好的子组件，而我们希望在父组件写好的样式影响到子组件 */
>>>.el-pagination {
  display: flex;
  justify-content:center;
  /* text-align: center; */
  /* float: left; */
}

/* 深度选择器 */
/* 因为el-pager是一个封装好的子组件，而我们希望在父组件写好的样式影响到子组件 */
>>> ul.el-pager {
  width:320px;
  height: 20px;
}


/* 因为下拉组件的menu是绝对定位 */
.el-dropdown {
  position: relative;
}

.el-dropdown-menu {
  position: absolute;
  width: 200px;
}

</style>