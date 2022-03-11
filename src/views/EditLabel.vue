<template>
  <Layout>
    <div class="navBar">
      <Icon name="arrowLeft" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem
        fileName="标签名"
        v-if="currentTag"
        :value="currentTag.name"
        @update:value="updateTag"
      />
    </div>
    <div class="button-wrapper">
      <Button class="delete" @click="remove">删除标签</Button>
      <Button @click="save">保存</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import FormItem from "@/components/Account/FormItem.vue";

@Component({
  components: { Button, FormItem },
})
export default class EditLabel extends Vue {
  get currentTag() {
    return this.$store.state.currentTag;
  }
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTag");
    this.$store.commit("setCurrentTag", id);
    if (!this.currentTag) {
      this.$router.replace("./404");
    }
  }
  save() {
    alert("保存成功");
  }
  updateTag(name: string) {
    if (this.currentTag) {
      this.$store.commit("updateTag", { id: this.currentTag.id, name });
      console.log(name);
    }
  }
  remove() {
    if (this.currentTag) {
      this.$store.commit("removeTag", this.currentTag.id);
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
  margin-top: 620px;
}
::v-deep .delete {
  background: none;
  border: 1px solid #ff9400;
  color: #ff9400;
}
</style>
