
<template>
  <Layout>
    <Tabs classPrefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
    {{this.recordList}}
  </Layout>
</template>

<script>
import Vue from 'vue';
import Tabs from '@/components/Tabs.vue';
import { Component } from 'vue-property-decorator';
import intervalList from "@/constants/intervalList"
import recordTypeList from "@/constants/recordTypeList"
@Component({
  components: {
    Tabs
  }
})
export default class Book extends Vue {
  get recordList () {
    return this.$store.state.recordList
  }
  get result () {
    return this.recordList
  }



  type = "-"
  interval = "day"
  intervalList = intervalList
  recordTypeList = recordTypeList
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  &.selected {
    background: #fff;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>