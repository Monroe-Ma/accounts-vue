<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList "
        :key="tag.id "
        :class="{selected:selectTags.indexOf(tag)>=0} "
        @click="toggle(tag)"
      >
        <span class="iconBg">
          <Icon :name=" tag.iconName " />
          <!-- <Icon name="eat" /> -->
        </span>
        <span>{{tag.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Tags extends Vue {
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
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: 100px;
      padding: 0 16px;
      margin-top: 4px;
      > .iconBg {
        display: block;
        width: 40px;
        height: 40px;
        background: #eee;
        border-radius: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 32px;
          height: 32px;
          fill: #ddd;
          line-height: 40px;
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