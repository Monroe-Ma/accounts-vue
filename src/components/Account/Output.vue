<template>
  <div class="output">
    <div @update="onValueChange">
      <span>￥</span>
      {{this.value}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Output extends Vue {
  @Prop(Number)
  readonly value!: number;
  // output = this.value.toString();
  onValueChange() {
    this.$emit("update:value", this.value);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
.output {
  background: #fff;
  div {
    font-size: 32px;
    color: #fd9300;
    font-weight: 600;
    margin: 0 10px;
    padding-bottom: 6px;
    padding: 14px;
    border-bottom: solid 1px #eee;
    span {
      font-size: 12px;
      color: #999;
      padding: 6px;
    }
  }
}
</style>