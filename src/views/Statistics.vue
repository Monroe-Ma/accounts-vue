<template>
  <Layout>
    <!-- <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" /> -->
    <Chart class="chart" :option="option" />
  </Layout>
</template>

<script lang="ts" >
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import Tabs from "@/components/Tabs.vue";
import Chart from "@/views/Chart.vue";

@Component({
  components: {
    Tabs,
    Chart,
  },
})
export default class Statistics extends Vue {
  interval = "day";
  intervalList = intervalList;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
.chart {
  height: 400px;
}
::v-deep .tabs {
  background: #fff;
  .interval-tabs-item {
    &.selected {
      color: #ff9400;
    }
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #ff9400;
    }
  }
}
</style>