<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in tagList "
        :key="tag.id "
        :class="{selected:selectTags.indexOf(tag)>=0} "
        @click="toggle(tag)"
        :value="onCancel "
      >
        <span class="iconBg">
          <Icon :name=" tag.iconName " />
        </span>
        <span>{{tag.name}}</span>
      </li>
      <li class="new" @click="create">
        <span class="iconBg">
          <Icon name="add" />
        </span>
        <span>新增标签</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop() value!: string[];

  onCancel() {
    this.selectTags = [];
  }

  get tagList() {
    return this.$store.state.tagList;
  }
  selectTags: string[] = [];
  created() {
    this.$store.commit("fetchTag");
  }

  toggle(tag: string) {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    } else {
      if (this.selectTags.length > 0) {
        this.selectTags.splice(index, 1);
      }
      this.selectTags.push(tag);
    }

    this.$emit("update:value", this.selectTags);
  }
  create() {
    const name = window.prompt("请输入标签");
    if (!name) {
      return window.alert("标签不能为空");
    }
    this.$store.commit("createTag", { name: name, iconName: "other" });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/reset.scss";
@import "~@/assets/helper.scss";

.tags {
  font-size: 14px;
  padding: 10px;
  flex-grow: 1;
  background: #fff;
  overflow: scroll;
  > .current {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    @media (max-width: 375px) {
      margin-left: 10px;
    }
    > li {
      $h: 24px;
      margin-bottom: 12px;
      line-height: 20px;
      border-radius: 100px;
      margin-top: 2px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 78px;
      > .iconBg {
        display: block;
        width: px2vw(80);
        height: px2vw(80);
        background: #eee;
        border-radius: px2vw(40);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: px2vw(48);
          height: px2vw(48);
          fill: #ddd;
          line-height: px2vw(80);
        }
      }
      &.selected {
        .iconBg {
          background-color: #fff2e9;
          .icon {
            fill: #ff9400;
          }
        }
      }
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