
<template>
  <div>
    <label class="notes">
      <span class="name">{{this.fileName}}</span>
      <input
        type="text"
        :value="value"
        @input="onValueChange($event.target.value)"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class FormItem extends Vue {
  @Prop({ default: " " }) readonly value!: string;
  @Prop({ required: true }) fileName!: string;
  @Prop() placeholder?: string;

  onValueChange(newValue: string) {
    this.$emit("update:value", newValue);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  padding-top: 10px;
  font-size: 14px;
  background: #fff;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
    font-weight: 400;
  }
  input {
    height: 44px;
    background: transparent;
    border: none;
    padding-right: 16px;
    outline: none;
  }
}
</style>