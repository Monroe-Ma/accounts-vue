<template>
  <Layout>
    <div class="navBar">
      <Icon name="arrowLeft" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem fileName="标签名" :value="tag.name" @update:value="updateTag" />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import modelTags from "@/models/modelTags";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import FormItem from "@/components/Account/FormItem.vue";

@Component({
  components: { Button, FormItem },
})
export default class EditLabel extends Vue {
  tag?: tag = { id: "", name: "" };
  created() {
    if (!window.findTag(this.$route.params.id)) {
      this.$router.replace("./404");
    }
  }
  updateTag(newName: string) {
    if (this.tag) {
      modelTags.update(this.tag.id, newName);
    }
  }
  remove(id: string) {
    if (this.tag) {
      if (window.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>
