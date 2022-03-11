<template>
  <button class="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";

.button {
  background: #ff9400;
  border-radius: 20px;
  color: white;
  width: 98px;
  border: none;
  height: 40px;
  padding: 0 16px;
  margin-right: 20px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>