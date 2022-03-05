<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <Tags :dataSource.sync=" tags " @update:value="onUpdateTags" />
    <Notes @update:value="onUpdateNotes" />
    <Types :value.sync="record.type" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Account/Types.vue";
import Tags from "@/components/Account/Tags.vue";
import Notes from "@/components/Account/Notes.vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "../models/recordListModel";
import modelTags from "../models/modelTags";
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAT?: Date;
};
@Component({
  components: { Tags, Notes, Types, NumberPad },
})
export default class Money extends Vue {
  tags = modelTags.fetch();
  recordList = recordListModel.fetch();
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: number) {
    this.record.amount = value;
  }
  saveRecord() {
    const record2 = recordListModel.clone(this.recordList);
    this.recordList.push(record2);
    record2.createdAt = new Date();
  }
  @Watch("recordList")
  onRecordChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>