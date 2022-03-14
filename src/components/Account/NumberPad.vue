<template>
  <div class="numberPad">
    <div class="pad clearfix">
      <button class="a" @click="inputContent">1</button>
      <button class="b" @click="inputContent">2</button>
      <button class="c" @click="inputContent">3</button>
      <button class="d" @click="remove">删除</button>
      <button class="e" @click="inputContent">4</button>
      <button class="f" @click="inputContent">5</button>
      <button class="g" @click="inputContent">6</button>
      <button class="h" @click="clear">清空</button>
      <button class="i" @click="inputContent">7</button>
      <button class="j" @click="inputContent">8</button>
      <button class="k" @click="inputContent">9</button>
      <button class="l" @click="ok">OK</button>
      <button class="m" @click="inputContent">0</button>
      <button class="n" @click="inputContent">.</button>
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
@function px2vw($px) {
  @return $px * 100vw/750;
}
.pad {
  margin-top: 10px;
  display: grid;
  grid-template:
    "a b c d"
    "e f g h"
    "i j k l"
    "m m n l" auto/ 23%;
  grid-column-gap: px2vw(4);
  grid-row-gap: px2vw(4);
  > button {
    background: #fff;
    border: none;
    text-align: center;
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    color: #333;
    padding: 18px 0;
  }
  .a {
    grid-area: a;
  }
  .b {
    grid-area: b;
  }
  .c {
    grid-area: c;
  }
  .d {
    grid-area: d;
  }
  .e {
    grid-area: e;
  }
  .f {
    grid-area: f;
  }
  .g {
    grid-area: g;
  }
  .h {
    grid-area: h;
  }
  .i {
    grid-area: i;
  }
  .j {
    grid-area: j;
  }
  .k {
    grid-area: k;
  }
  .l {
    grid-area: l;
    background: #ff9400;
    color: #fff;
  }
  .m {
    grid-area: m;
  }
  .n {
    grid-area: n;
  }
}
/* .pad {
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
} */
</style>


