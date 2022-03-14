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