<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <Tags :dataSource.sync=" tags " @update:value="onUpdateTags" />
    <FormItem fileName="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes" />
    <Types :value.sync="record.type" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Account/Types.vue";
import Tags from "@/components/Account/Tags.vue";
import FormItem from "@/components/Account/FormItem.vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import { Component, Watch } from "vue-property-decorator";
import recordListModel from "../models/recordListModel";
import modelTags from "../models/modelTags";

const recordList = recordListModel.fetch();
const tagList = modelTags.fetch();
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};
@Component({
  components: { Tags, FormItem, Types, NumberPad },
})
export default class Account extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
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
    const record2 = recordListModel.clone(this.record);
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