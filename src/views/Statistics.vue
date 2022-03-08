<template>
  <Layout>
    <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: {
    Tabs,
  },
})
export default class Statistics extends Vue {
  interval = "day";
  intervalList = intervalList;
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
</style>