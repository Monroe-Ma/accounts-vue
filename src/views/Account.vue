<template>
  <Layout class-prefix="layout">
    <Tags />
    <Notes />
    <Types />
    <NumberPad />
  </Layout>
</template>

<script lang="ts">
import Types from "@/components/Account/Types.vue";
import Tags from "@/components/Account/Tags.vue";
import Notes from "@/components/Account/Notes.vue";
import NumberPad from "@/components/Account/NumberPad.vue";
export default {
  name: "Money",
  components: { Tags, Notes, Types, NumberPad },
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>