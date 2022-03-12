<template>
  <div class="wrapper" ref="wrapper"></div>
  <!-- <div v-for="m in monthList">{{m.type}}</div> -->
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import echarts, { EChartOption, ECharts } from "echarts";

@Component({
  components: {},
})
export default class CurrentMonthPayChart extends Vue {
  @Prop()
  option?: EChartOption;

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get monthList() {
    console.log("grouped list 被读取了");

    // ['2021-01', '2021-02', '2021-03', '2021-04', '2021-05', '2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11'],
    console.log("this.recordList", this.recordList);

    return;
  }

  mounted() {
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.option!);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
.wrapper {
  height: 400px;
}
</style>