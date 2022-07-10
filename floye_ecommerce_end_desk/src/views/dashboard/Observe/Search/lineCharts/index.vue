<template>
  <div class="linechart">
    <!-- 头部 -->
    <div class="head">
      <span>搜索用户数</span>
      <svg
        t="1657383207638"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2272"
        width="20"
        height="20"
      >
        <path
          d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z"
          p-id="2273"
          fill="#bfbfbf"
        ></path>
      </svg>
    </div>
    <!-- 中间区域 -->
    <div class="main">
      <span>12321</span>
      <span
        >17.1&nbsp;
        <svg
          t="1657284168550"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4331"
          width="20"
          height="20"
        >
          <path
            d="M960 704L512 256l-448 448z"
            fill="#d81e06"
            p-id="4332"
          ></path>
        </svg>
        <svg
          t="1657284448711"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5547"
          width="20"
          height="20"
        >
          <path
            d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z"
            p-id="5548"
            fill="#1afa29"
          ></path>
        </svg>
      </span>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "lineCharts",
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
          type: "line",
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          smooth: true,
          //   拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          //   线条的样式
          lineStyle: {
            color: "blue",
          },
          //   填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
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
.linechart {
  padding: 25px 0;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom:25px;
}

.main {
  display: flex;
  justify-content: space-between;
}
.charts {
  width: 100%;
  height: 100px;
}
</style>