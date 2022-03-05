
<template>
  <div>编辑标签</div>
</template>

<script lang="ts">
import modelTags from "@/models/modelTags";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    modelTags.fetch();
    const tags = modelTags.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("./404");
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/helper.scss";
</style>

