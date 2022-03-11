<template>
  <div id="chartsA" class="wrapper"></div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import * as echarts from "echarts";

@Component({
  components: {},
})
export default class Chart extends Vue {
  option = {};
  mounted() {
    const dom = document.getElementById("chartsA");
    if (dom) {
      const myChart = echarts.init(dom);
      const option = {
        title: {
          text: "月度收入支出占比",
          subtext: "金额",
          textStyle: {
            height: 30,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["收入", "支出"],
          orient: "horizontal",
          left: "center",
          bottom: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data: ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11'],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "收入",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
          {
            name: "支出",
            type: "bar",
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
            markPoint: {
              data: [
                { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "Avg" }],
            },
          },
        ],
      };
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
.wrapper {
  background: #fff;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  .chart {
    height: 400px;
  }
}
</style>