<template>
  <Layout>
    <div class="wrapper">
      {{mouthPay}}
      <MonthChart class="chart" :options="monthOptions" />
    </div>
    <div class="wrapper">
      <CurrentMonthPayChart class="chart" :option="currentMonthPayOption" />
    </div>
  </Layout>
</template>

<script lang="ts" >
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import Tabs from "@/components/Tabs.vue";
import CurrentMonthPayChart from "@/components/CurrentMonthPayChart.vue";
import MonthChart from "@/components/MonthChart.vue";
import clone from "@/lib/clone";
import dayjs from "dayjs";
import * as _ from "lodash";

@Component({
  components: {
    Tabs,
    CurrentMonthPayChart,
    MonthChart,
  },
})
export default class Statistics extends Vue {
  interval = "day";
  intervalList = intervalList;
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  mounted() {
    this.$store.commit("fetchRecords");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get monthList() {
    const newList = clone(this.recordList);
    const result = [];
    for (let i = 0; i < 12; i++) {
      const mouth = new Date();
      const mouthString = dayjs(mouth).subtract(i, "month").format("YYYY-MM");

      const mouthList = newList.filter((t) => {
        return dayjs(t.createAt).format("YYYY-MM") === mouthString;
      });
      const paySum = mouthList
        .filter((t) => t.type === "-")
        .reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      const incomeSum = mouthList
        .filter((t) => t.type === "+")
        .reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      result.push({
        yearMouth: mouthString,
        mouthPay: paySum,
        mouthIncome: incomeSum,
      });
    }
    // console.log(result);

    const key = result.map((t) => t.yearMouth);
    // console.log("key", key);
    // 【1，2，3 】
    const yearMouth = key.sort((a: any, b: any) => a.valueOf() - b.valueOf());

    const mouthPay = result.map((t) => t.mouthPay);
    const mouthIncome = result.map((t) => t.mouthIncome);
    return { yearMouth, mouthPay, mouthIncome };
  }
  get mouthPay() {
    console.log("this.recordList", this.recordList);

    const newList = clone(this.recordList);
    console.log("newList", newList);

    const revenueList = newList.filter(
      (c) => c.createAt.indexOf(dayjs(new Date()).format("YYYY-MM-DD")) >= 0
    );
    console.log("revenueList", revenueList);
    const payList = revenueList.filter((t) => {
      if (t.type === "-") {
        return t.tags;
      }
      return;
    });

    console.log("pay", clone(payList));
    const arrayPay: any[] = [];

    for (let i = 0; i < payList.length; i++) {
      const element = arrayPay[i];

      if (payList[i]) {
        const value = payList[i].amount;
        // const name = payList[i].tags.name;
      }
    }

    arrayPay.push();
    console.log("pay", payList);

    // const paySum = revenueList
    //   .filter((t) => t.type === "-")
    //   .reduce((sum, item) => {
    //     return sum + item.amount;
    //   }, 0);

    // const incomeSum = revenueList
    //   .filter((t) => t.type === "+")
    //   .reduce((sum, item) => {
    //     return sum + item.amount;
    //   }, 0);

    return;
  }

  get monthOptions() {
    return {
      title: {
        text: "月度收入支出对比",
        subtext: "金额",
      },
      dataZoom: [
        {
          id: "dataZoomX",
          type: "inside",
          xAxisIndex: [0],
          filterMode: "filter",
          start: 70,
        },
      ],

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
          axisLabel: {
            interval: 0,
          },
          // prettier-ignore
          data: this.monthList.yearMouth,
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
          data: this.monthList.mouthIncome,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
          itemStyle: {
            color: "#3BA272",
          },
        },
        {
          name: "支出",
          type: "bar",
          data: this.monthList.mouthPay,
          markPoint: {
            data: [
              { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
              { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
          itemStyle: {
            color: "#FC8452",
          },
        },
      ],
    };
  }
  get currentMonthPayOption() {
    return {
      title: {
        text: "本月支出对比",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "horizontal",
        left: "center",
        bottom: "bottom",
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
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
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
    };
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
.wrapper {
  background: #fff;
  margin: 10px;
  padding: 4px;
  border-radius: 10px;
}
</style>