<template>
  <Layout class-prefix="layout">
    {{records}}
    <Tags :dataSource.sync=" tags " @update:value="onUpdateTags" />
    <Notes @update:value="onUpdateNotes" />
    <Types :value.sync="records.type" />
    <NumberPad @update:value="onUpdateAmount" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Account/Types.vue";
import Tags from "@/components/Account/Tags.vue";
import Notes from "@/components/Account/Notes.vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import { Component } from "vue-property-decorator";
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
};
@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  records: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  onUpdateTags(value: string[]) {
    this.records.tags = value;
  }
  onUpdateNotes(value: string) {
    this.records.notes = value;
  }
  // onUpdateType(value: string) {
  //   this.records.type = value;
  // }
  onUpdateAmount(value: number) {
    this.records.amount = value;
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>