<template>
  <Layout>
    <div class="tags">
      <router-link :to=" `/labels/edit/${tag.id}` " class="tag" v-for=" tag in tags " :key="tag.id">
        <span>{{tag.name}}</span>
        <Icon name="arrowRight" />
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
import modelTags from "../models/modelTags";
import Button from "../components/Button.vue";

modelTags.fetch();
@Component({
  components: { Button },
})
export default class Labels extends Vue {
  tags = modelTags.data;
  createTag() {
    const name = window.prompt("请输入标签");
    if (name) {
      const message = modelTags.create(name);
      if (message === "duplicated") {
        window.alert("标签重复了");
      } else if (message === "success") {
        window.alert("添加标签成功");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }
  svg {
    width: 18px;
    height: 18px;
    color: #666;
    margin-right: 16px;
  }
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>