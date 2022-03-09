<template>
  <div class="numberPad">
    <div class="output">
      <span>￥</span>
      {{output}}
    </div>
    <div class="pad clearfix">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" id="save" :style="{height:buttonHeight}">OK</button>
      <button @click="inputContent" id="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;

  @Watch("output")
  onChangeValue(newVal: string, oldVal: string) {
    // console.log(newVal);
    this.$emit("update:value", Number(newVal));
    // todo...
  }

  output = this.value.toString();

  zero = document.getElementById("zero");
  buttonHeight(zero: HTMLElement) {
    if (zero) {
      const x = this.zero?.offsetHeight ?? 50;
      console.log(x);
      return x * 2 + 4 + "px";
    }
  }

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const buttonInput = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(buttonInput) >= 0) {
        this.output = buttonInput;
      } else {
        this.output += buttonInput;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0 && buttonInput === ".") {
      return;
    }
    this.output += buttonInput;
    return;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
    return;
  }
  clear() {
    this.output = "0";
    return;
  }
  ok() {
    const number = parseInt(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";

.pad {
  text-align: center;
  > button {
    background: #fff;
    border: none;
    width: 24%;
    padding: 18px 0;
    text-align: center;
    float: left;
    margin: 2px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    color: #333;
  }
  #zero {
    width: 49%;
  }
  #save {
    height: 110px;
    color: #fff;
    background: #ff9400;
    float: right;
  }
}

/* .numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64 * 2px;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
} */
</style>


