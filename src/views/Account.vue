<template>
  <Layout class-prefix="layout">
    <Tags :dataSource.sync=" tags " />
    <Notes />
    <Types />
    <NumberPad />
  </Layout>
</template>

<script lang="js">
import Types from "@/components/Account/Types.vue";
import Tags from "@/components/Account/Tags.vue";
import Notes from "@/components/Account/Notes.vue";
import NumberPad from "@/components/Account/NumberPad.vue";
export default {
  name: "Money",
  components: { Tags, Notes, Types, NumberPad },
  data(){
    return{
    tags:["衣","食","住","行"]
    }
  }
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>