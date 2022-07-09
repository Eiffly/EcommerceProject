<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barCharts",
  mounted() {
    let myEchart = echarts.init(this.$refs.charts);
    myEchart.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      //系列
      series: [
        {
          type: "bar",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44,12,15,16],
          smooth: true,       
       
        },
      ],
      //布局调试
      grid: {
        left:0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });

  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
