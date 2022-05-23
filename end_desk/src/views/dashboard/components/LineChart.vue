<template>
  <!--挂载点  -->
  <div :style="{ width, height }"></div>
</template>

<script>
//第一步：引包
import echarts from "echarts";
  import resize from './mixins/resize'
//引入主题
require("echarts/theme/macarons");
export default {
  name: "",
  mixins: [resize],
  data() {
    return {
      chart:null
    }
  },
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    yTittle: {
      type: String
    },
    chartData:{
      type:Object,
      default:{}
    }
  },
  //组件挂载完毕----节点DOM
  mounted() {
    // 基于准备好的dom，初始化echarts实例  第二个参数用于设置主题颜色
    //为什么拆函数：因为父亲给的数据存在异步操作（延迟器）
    //等父组件的数据给你传递，需要再次修改配置项，因此你需要封装为函数
     this.initChart();
     this.setData({expectedData:[],actualData:[]});
  },
  methods: {
    //初始化chart对象
    initChart() {
       this.chart = echarts.init(this.$el, "macarons");
    },
    //设置echart的配置对象
    setData({expectedData = [],actualData = []}){
      // 指定图表的配置项和数据
     var option = {
      //标题
      title: {
        text: this.yTittle
      },
      //表格组件网页布局
      grid: {
        left: 40,
        top: 40,
        bottom: 40,
        right: 40
      },
      //提示框组件
      tooltip: {
        axisPointer: {
          type: "cross"
        }
      },

      legend: {
        data: ["期望", "实际"]
      },
      xAxis: {
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        boundaryGap: false
      },
      yAxis: {},
      //系列
      series: [
        {
          name: "期望",
          type: "line",
          data: expectedData
        },
        {
          name: "实际",
          type: "line",
          data: actualData,
          itemStyle: {
            color: "red"
          },
          //只能改线的颜色，黑色盒子前面球的颜色不能变
          lineStyle: {
            color: "blue"
          },
          areaStyle: {
            color: "purple"
          }
        }
      ]
     };
    // 使用刚指定的配置项和数据显示图表。
     this.chart.setOption(option);
    }
  },
  watch: {
    //监听父组件给的数据【异步语句：类似于axios发请求】
    chartData(newValue) {
      //重新配置配置对象
      this.setData(newValue);
    },
  },
};
</script>

<style scoped></style>
