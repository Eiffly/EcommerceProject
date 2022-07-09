<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥ 126560">
            <!-- 具名插槽 charts -->
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%
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
                日同比&nbsp;&nbsp;18.18%
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
            </template>
            <!-- 具名插槽 footer -->
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <span>
                <lineCharts></lineCharts>
              </span>
            </template>
             <template slot="footer">
              <span>日访问量&nbsp;&nbsp;1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <barCharts/>
            </template>
            <template slot="footer">
              <span>转化率&nbsp;&nbsp;85%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <span>
                <progressCharts></progressCharts>
              </span>
            </template>
             <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;12%
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
                日同比&nbsp;&nbsp;11%
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
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCharts from "./lineCharts";
import barCharts from "./barCharts";
import progressCharts from "./progressCharts";

export default {
  name: "Card",
  components: { Detail,lineCharts,barCharts,progressCharts },
};
</script>

<style scoped>
svg {
  padding-top: 6px;
}

</style>