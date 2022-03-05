<template>
  <Layout>
    <div class="navBar">
      <Icon name="arrowLeft" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <!-- <label for>
        标签名
        <input
          :value="tag&&tag.name ||''"
          type="text"
          @input="onValueChanged($event.target.value)"
          @updateTag:value="updateTag"
        />
      </label>-->
      <FormItem fileName="标签名" :value="tag.name" @updateTag:value="updateTag" />
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
  tag?: { id: string; name: string } = undefined;
  created() {
    const id = this.$route.params.id;
    modelTags.fetch();
    const tags = modelTags.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("./404");
    }
  }
  updateTag(id: string, name: string) {
    console.log("111", name);
    if (this.tag) {
      modelTags.update(this.tag.id, name);
    }
  }
  remove(id: string) {
    if (this.tag) {
      modelTags.remove(this.tag.id);
    }
  }
  goBack() {
    this.$router.back();
  }
  // @Watch("value")
  // onValueChanged(value: string) {
  //   this.$emit("update:value", value);
  // }
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
