<template>
  <Layout>
    <div class="wrapper">
      {{monthPay}}
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
      const month = new Date();
      const monthString = dayjs(month).subtract(i, "month").format("YYYY-MM");

      const monthList = newList.filter((t) => {
        return dayjs(t.createAt).format("YYYY-MM") === monthString;
      });
      const paySum = monthList
        .filter((t) => t.type === "-")
        .reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      const incomeSum = monthList
        .filter((t) => t.type === "+")
        .reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      result.push({
        yearMonth: monthString,
        monthPay: paySum,
        monthIncome: incomeSum,
      });
    }

    // 排序要对整个result数组排序才对吧
    result.sort((prev, next) => prev.yearMonth > next.yearMonth ? 1 : -1)

    const yearMonth = result.map(t => t.yearMonth)
    const monthPay = result.map((t) => t.monthPay);
    const monthIncome = result.map((t) => t.monthIncome);
    return { yearMonth, monthPay, monthIncome };
  }
  get monthPay() {
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
        const name = payList[i].tags[0]?.name;
      }
    }

    arrayPay.push();

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
          data: this.monthList.yearMonth,
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
          data: this.monthList.monthIncome,
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
          data: this.monthList.monthPay,
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
