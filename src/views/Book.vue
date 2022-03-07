
<template>
  <Layout>
    <Tabs classPrefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
  </Layout>
</template>

<script>
import Vue from 'vue';
import Types from '@/components/Account/Types.vue';
import Tabs from '@/components/Tabs.vue';
import { Component } from 'vue-property-decorator';
import intervalList from "@/constants/intervalList"
import recordTypeList from "@/constants/recordTypeList"
@Component({
  components: {
    Types, Tabs
  }
})
export default class Book extends Vue {
  type = "-"
  interval = "day"
  intervalList = intervalList
  recordTypeList = recordTypeList
}
</script>

<style lang="scss" scoped>
.type-tabs-item ::v-deep {
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