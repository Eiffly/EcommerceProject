<template>
  <div>
      <el-button type="primary" v-if="$BTN('btn.Test04151.add')">添加</el-button>
      <el-button type="primary" v-if="$BTN('btn.Test04151.update')">修改</el-button>
      <el-button type="primary" v-if="$BTN('btn.Test04151.delete')">删除</el-button>
  </div>
</template>

<script>
export default {
  name: '',
}
</script>

<style scoped>

</style>
