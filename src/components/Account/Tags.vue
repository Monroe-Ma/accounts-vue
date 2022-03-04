<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource,index " key="index ">{{tag}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[] | undefined;
  selectTags: string[] = [];
}
</script>

<style lang="scss" scoped>
@import "~@/assets/reset.scss";
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #d9d9d9;
      $h: 24px;
      height: $h;
      line-height: $h;
      /* border-radius: $h/2; */
      border-radius: 100px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>