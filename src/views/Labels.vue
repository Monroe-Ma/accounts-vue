<template>
  <Layout>
    <div class="tags">
      <router-link :to=" `/labels/edit/${tag.id}` " class="tag" v-for=" tag in tags " :key="tag.id">
        <li class="iconBg">
          <Icon :name="tag.iconName" />
        </li>
        <span>{{tag.name}}</span>
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "../components/Button.vue";
@Component({
  components: { Button },
})
export default class Labels extends Vue {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTag");
  }
  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", { name: name, iconName: "other" });
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    align-items: center;
    width: 30%;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    background: #fff;
    .iconBg {
      width: 40px;
      height: 40px;
      background: #fff2e9;
      border-radius: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
      .icon {
        fill: #ff9400;
      }
    }
  }
}
.button-wrapper ::v-deep {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  > button {
  }
}
</style>