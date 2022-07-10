<template>
  <div>
    <!--  Search 区域-->
    <el-row :gutter="10">
      <el-col :span="12" class="el-col">
        <el-card class="card">
          <Search />
        </el-card>
      </el-col>
      <!--  Category区域 -->
      <el-col :span="12">
        <el-card class="card">
          <Category />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Search from "./Search";
import Category from "./Category";

export default {
  name: "Observe",
  components: {
    Search,
    Category,
  },
};
</script>

<style scoped>
.card{
  margin-top:30px
}


</style>