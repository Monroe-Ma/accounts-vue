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
      <!-- <button @click="ok" id="save" :style="{height:getH()+'px'}">OK</button> -->
      <button @click="ok" id="save" :height=" height+ 'px' ">{{getH.height}}</button>
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
  @Prop(String) height!: string;

  @Watch("output")
  onChangeValue(newVal: string, oldVal: string) {
    this.$emit("update:value", Number(newVal));
  }

  mounted() {
    // this.$emit("getH", this.height);
  }
  //TUDU
  // height = document.getElementById("zero")!.offsetHeight * 2 + 299;
  getH() {
    let elem: HTMLElement;
    const zero = document.getElementById("zero");
    let x: number = 0;
    if (zero) {
      elem = zero;
      x = elem.offsetHeight * 2 + 299;
    }
    const height = x + "px";

    return height;
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
</style>


