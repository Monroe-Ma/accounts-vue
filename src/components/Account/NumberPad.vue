<template>
  <div class="numberPad">
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
      <button @click="ok" id="save" :style=" {height:saveHeight +'px'} ">OK</button>
      <button @click="inputContent" id="zero" :style=" {width:zeroWidth +'px'} ">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import clone from "@/lib/clone";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;

  @Watch("output")
  onChangeValue(newVal: string, oldVal: string) {
    this.$emit("update:value", Number(newVal));
  }
  saveHeight: number = 0;
  zeroWidth: number = 0;
  mounted() {
    this.getH();
  }
  getH() {
    const zero = document.getElementById("zero");
    const save = document.getElementById("save");
    let zeroHeight = 0;
    let saveWidth = 0;

    if (zero) {
      zeroHeight = zero.offsetHeight;
    }
    if (save) {
      saveWidth = save.offsetWidth;
    }
    const height = zeroHeight * 2 + 4;
    const width = saveWidth * 2 + 2;
    this.saveHeight = height;
    this.zeroWidth = width;
  }

  output = this.value.toString();

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

  #save {
    color: #fff;
    background: #ff9400;
    float: right;
  }
}
</style>


