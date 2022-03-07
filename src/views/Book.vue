
<template>
  <Layout>
    <Tabs classPrefix="type" :data-source="typeList" :value.sync="type" />
    <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
  </Layout>
</template>

<script>
import Vue from 'vue';
import Types from '@/components/Account/Types.vue';
import Tabs from '@/components/Tabs.vue';
import { Component } from 'vue-property-decorator';
@Component({
  components: {
    Types, Tabs
  }
})
export default class Book extends Vue {
  type = "-"
  interval = "day"

  intervalList = [
    { text: "按日", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "mouth" }
  ]
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" }
  ]

}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  li {
    &.selected {
      background: #fff;
      &::after {
        display: none;
      }
    }
  }
}
</style>