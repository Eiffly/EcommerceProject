<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "progressCharts",
  mounted() {
    let myEchart = echarts.init(this.$refs.charts);
    myEchart.setOption({
      xAxis: {
        show: false,
        // 显示最大与最小值
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      //系列
      series: [
        {
          type: "bar",
          data: [78],
          barWidth: 10,
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
          label: {
            show: true,
            formatter: "|",
            position: "right",
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
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
