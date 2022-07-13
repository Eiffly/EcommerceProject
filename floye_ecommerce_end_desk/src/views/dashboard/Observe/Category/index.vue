<template>
  <div>
    <div class="header">
      <span>销售额类别占比</span>
      <el-radio-group v-model="radio" size="mini">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>

    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio: "全部渠道",
    };
  },
  mounted() {
    let myEchart = echarts.init(this.$refs.charts);
    myEchart.setOption({
      // 指定标题的内容
      title: {
        text: "",
        subtext: "",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          //显示指示的线
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    //鼠标事件
    myEchart.on("mouseover", (params) => {
      const { name, value } = params.data;
      myEchart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    //   console.log(params);
    });
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}
</style>