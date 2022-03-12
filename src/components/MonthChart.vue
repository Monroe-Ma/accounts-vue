<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import echarts, { EChartOption, ECharts } from "echarts";
@Component
export default class MonthChart extends Vue {
  @Prop()
  options?: EChartOption;
  mounted() {
    if (this.options === undefined) {
      return console.log("options");
    }
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>