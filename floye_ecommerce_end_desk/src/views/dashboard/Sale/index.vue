<template>
  <div>
    <el-card class="card">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 头部左侧 v-model="activeName" @tab-click="handleClick"-->
        <el-tabs class="tab" v-model="activeName">
          <el-tab-pane label="销售量" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧 -->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <!-- 日期选择器   v-model="date"收集数据 -->
          <el-date-picker
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            v-model="date"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
        <el-row>
          <el-col :span="16">
            <div class="charts" ref="charts">我是图表</div>
          </el-col>
          <el-col :span="8" class="li">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="li_index"> 1</span>
                <span>肯德基</span>
                <span class="li_value">12345</span>
              </li>
              <li>
                <span class="li_index"> 2</span>
                <span>麦当劳</span>
                <span class="li_value">11000</span>
              </li>
              <li>
                <span class="li_index"> 3</span>
                <span>必胜客</span>
                <span class="li_value">8899</span>
              </li>
              <li>
                <span class="noli_index"> 4</span>
                <span>西贝筱面村</span>
                <span class="li_value">7700</span>
              </li>
              <li>
                <span class="noli_index"> 5</span>
                <span>和府捞面</span>
                <span class="li_value">6000</span>
              </li>
              <li>
                <span class="noli_index"> 6</span>
                <span>星巴克</span>
                <span class="li_value">5000</span>
              </li>
              <li>
                <span class="noli_index"> 7</span>
                <span>李师傅</span>
                <span class="li_value">4646</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale",
      mycharts: null,
      date: [],
    };
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
        },
      ],
    });
  },
  computed: {
    title: {
      get(){
        return this.activeName == "sale" ? "销售量" : "访问量";
      },
      set() {
      },
    },
    ...mapState({
      listState: (state) => state.home.list,
    }),
  },
  watch: {
    title() {
      this.mycharts.setOption({
        title: {
          text: this.title + "数据",
        },
        xAxis: [
          {
            data:
              this.title == "销售量"
                ? this.listState.orderFullYearAxis
                : this.listState.userFullYearAxis,
          },
        ],
        series: [
          {
            data:
              this.title == "销售量"
                ? this.listState.orderFullYear
                : this.listState.userFullYear,
          },
        ],
      });
    },

    listState() {
      this.mycharts.setOption({
        title: {
          text: `${this.title}` + "数据",
        },
        xAxis: [
          {
            data: (this.title = this.listState.orderFullYearAxis),
          },
        ],
        series: [
          {
            data: (this.title = this.listState.orderFullYear),
          },
        ],
      });
    },
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(0).format("YYYY-MM-DD");
      const end = dayjs().day(6).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style>
.card {
  margin-top: 20px !important;
}
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
}

.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
span {
  padding-right: 10px;
}

.date {
  margin: 0 20px;
  width: 250px !important;
}

.charts {
  /* width: 100%; */
  height: 300px;
}

.li span {
  margin: 0px 10px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  margin: 10px 0px;
}
.li_index {
  float: left;
  padding-left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.noli_index {
  padding-left: 5px;
}
.li_value {
  float: right;
}
</style>